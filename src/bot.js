const Discord = require('discord.js');
const fs = require('fs');
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const Facebook = require("erela.js-facebook");
const Deezer = require("erela.js-deezer");
const AppleMusic = require("erela.js-apple");

const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    },
    autoReconnect: true,
    disabledEvents: ["TYPING_START"],
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.Message,
        Discord.Partials.Reaction,
        Discord.Partials.User,
        Discord.Partials.GuildScheduledEvent
    ],
    intents: [
        Discord.Intents.FLAGS.Guilds,
        Discord.Intents.FLAGS.GuildMembers,
        Discord.Intents.FLAGS.GuildBans,
        Discord.Intents.FLAGS.GuildEmojisAndStickers,
        Discord.Intents.FLAGS.GuildIntegrations,
        Discord.Intents.FLAGS.GuildWebhooks,
        Discord.Intents.FLAGS.GuildInvites,
        Discord.Intents.FLAGS.GuildVoiceStates,
        Discord.Intents.FLAGS.GuildMessages,
        Discord.Intents.FLAGS.GuildMessageReactions,
        Discord.Intents.FLAGS.GuildMessageTyping,
        Discord.Intents.FLAGS.DirectMessages,
        Discord.Intents.FLAGS.DirectMessageReactions,
        Discord.Intents.FLAGS.DirectMessageTyping,
        Discord.Intents.FLAGS.GuildScheduledEvents,
        Discord.Intents.FLAGS.MessageContent
    ],
    restTimeOffset: 0
});

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Configure Lavalink nodes based on Spotify availability
const lavalinkNodes = clientID && clientSecret ? [
    {
        host: process.env.LAVALINK_HOST || "lavalink.api.timelessnesses.me",
        port: parseInt(process.env.LAVALINK_PORT) || 80,
        password: process.env.LAVALINK_PASSWORD || "youshallnotpass",
        secure: Boolean(process.env.LAVALINK_SECURE) || false
    },
    {
        host: "209.145.62.164",
        port: 50117,
        password: "redant"
    }
] : [
    {
        host: process.env.LAVALINK_HOST || "lava-v3.ajieblogs.eu.org",
        port: parseInt(process.env.LAVALINK_PORT) || 443,
        password: process.env.LAVALINK_PASSWORD || "https://dsc.gg/ajidevserver",
        secure: Boolean(process.env.LAVALINK_SECURE) || true
    }
];

// Initialize the music player manager
client.player = new Manager({
    plugins: [
        new AppleMusic(),
        new Deezer(),
        new Facebook(),
        clientID && clientSecret ? new Spotify({ clientID, clientSecret }) : null
    ].filter(Boolean),
    nodes: lavalinkNodes,
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

// Load music-related events dynamically
const musicEvents = fs.readdirSync('./src/events/music').filter(file => file.endsWith('.js'));
for (const file of musicEvents) {
    const event = require(`./events/music/${file}`);
    client.player.on(file.split('.')[0], event.bind(null, client)).setMaxListeners(0);
}

// Connect to database
require("./database/connect")();

// Load client settings and configurations
client.config = require('./config/bot');
client.changelogs = require('./config/changelogs');
client.emotes = require("./config/emojis.json");
client.webhooks = require("./config/webhooks.json");

// Ensure webhook ID and token are set in .env for logging
const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
    for (const webhookName of webHooksArray) {
        client.webhooks[webhookName].id = process.env.WEBHOOK_ID;
        client.webhooks[webhookName].token = process.env.WEBHOOK_TOKEN;
    }
}

// Initialize collections and maps for commands and managers
client.commands = new Discord.Collection();
client.playerManager = new Map();
client.triviaManager = new Map();
client.queue = new Map();

// Webhook clients for logging
const consoleLogs = new Discord.WebhookClient(client.webhooks.consoleLogs.id, client.webhooks.consoleLogs.token);
const warnLogs = new Discord.WebhookClient(client.webhooks.warnLogs.id, client.webhooks.warnLogs.token);

// Load handlers for command and event processing
fs.readdirSync('./src/handlers').forEach((dir) => {
    fs.readdirSync(`./src/handlers/${dir}`).forEach((handler) => {
        require(`./handlers/${dir}/${handler}`)(client);
    });
});

// Log in to Discord using the provided token
client.login(process.env.DISCORD_TOKEN);

// Handle unhandled promise rejections
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    const errorString = error ? (error.length > 950 ? error.slice(0, 950) + '... view console for details' : error.toString()) : 'No error';
    const stackString = error && error.stack ? (error.stack.length > 950 ? error.stack.slice(0, 950) + '... view console for details' : error.stack) : 'No stack error';
    
    const embed = new Discord.MessageEmbed()
        .setTitle('🚨・Unhandled promise rejection')
        .addField('Error', Discord.Util.codeBlock('js', errorString))
        .addField('Stack Error', Discord.Util.codeBlock('js', stackString))
        .setColor(client.config.colors.normal);

    consoleLogs.send({
        username: 'Cludo Logs',
        embeds: [embed],
    }).catch((err) => {
        console.error('Error sending unhandledRejection to webhook', err);
    });
});

// Handle warnings
process.on('warning', warn => {
    console.warn('Warning:', warn);

    const embed = new Discord.MessageEmbed()
        .setTitle('🚨・New warning found')
        .addField('Warn', Discord.Util.codeBlock('js', warn.toString()))
        .setColor(client.config.colors.normal);

    warnLogs.send({
        username: 'Cludo Logs',
        embeds: [embed],
    }).catch((err) => {
        console.error('Error sending warning to webhook', err);
    });
});

// Handle WebSocket errors
client.on(Discord.Constants.ShardEvents.ERROR, error => {
    console.error('WebSocket error:', error);

    const embed = new Discord.MessageEmbed()
        .setTitle('🚨・A websocket connection encountered an error')
        .addField('Error', Discord.Util.codeBlock('js', error.toString()))
        .addField('Stack Error', Discord.Util.codeBlock('js', error.stack || 'No stack error'))
        .setColor(client.config.colors.normal);

    consoleLogs.send({
        username: 'Cludo Logs',
        embeds: [embed],
    }).catch((err) => {
        console.error('Error sending WebSocket error to webhook', err);
    });
});
