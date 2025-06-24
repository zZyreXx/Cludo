const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    WebhookClient, 
    EmbedBuilder, 
    Collection, 
    codeBlock 
} = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const Facebook = require("erela.js-facebook");
const Deezer = require("erela.js-deezer");
const AppleMusic = require("erela.js-apple");

// === CLIENT SETUP ===
const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.MessageContent
    ],
    restTimeOffset: 0
});

// === LAVALINK SETUP ===
const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

client.player = new Manager({
    plugins: [
        new AppleMusic(),
        new Deezer(),
        new Facebook(),
        ...(clientID && clientSecret ? [new Spotify({ clientID, clientSecret })] : [])
    ],
    nodes: clientID && clientSecret ? [
        {
            host: process.env.LAVALINK_HOST || "lavalink.api.timelessnesses.me",
            port: parseInt(process.env.LAVALINK_PORT) || 80,
            password: process.env.LAVALINK_PASSWORD || "youshallnotpass",
            secure: process.env.LAVALINK_SECURE === "true"
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
            secure: true
        }
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    }
});

// === MUSIC EVENTS ===
const events = fs.readdirSync(`./src/events/music`).filter(f => f.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/music/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client)).setMaxListeners(0);
}

// === DATABASE ===
require("./database/connect")();

// === CLIENT CONFIGURATION ===
client.config = require('./config/bot');
client.changelogs = require('./config/changelogs');
client.emotes = require("./config/emojis.json");
client.webhooks = require("./config/webhooks.json");

const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
    for (const webhookName of webHooksArray) {
        client.webhooks[webhookName].id = process.env.WEBHOOK_ID;
        client.webhooks[webhookName].token = process.env.WEBHOOK_TOKEN;
    }
}

// === MISC DATA STRUCTURES ===
client.commands = new Collection();
client.playerManager = new Map();
client.triviaManager = new Map();
client.queue = new Map();

// === WEBHOOK LOGGERS ===
const consoleLogs = WebhookClient.from({
    id: client.webhooks.consoleLogs.id,
    token: client.webhooks.consoleLogs.token,
});

const warnLogs = WebhookClient.from({
    id: client.webhooks.warnLogs.id,
    token: client.webhooks.warnLogs.token,
});

// === LOAD HANDLERS ===
fs.readdirSync('./src/handlers').forEach((dir) => {
    fs.readdirSync(`./src/handlers/${dir}`).forEach((handler) => {
        require(`./handlers/${dir}/${handler}`)(client);
    });
});

// === LOGIN ===
client.login(process.env.DISCORD_TOKEN);

// === ERROR HANDLING ===
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    const embed = new EmbedBuilder()
        .setTitle(`🚨・Unhandled promise rejection`)
        .addFields([
            { name: "Error", value: codeBlock(error?.message || "No message") },
            { name: "Stack", value: codeBlock(error?.stack || "No stack trace") }
        ])
        .setColor(client.config.colors.normal);
    consoleLogs.send({ username: 'Cludo Logs', embeds: [embed] }).catch(console.error);
});

process.on('warning', warn => {
    console.warn("Warning:", warn);
    const embed = new EmbedBuilder()
        .setTitle(`🚨・New warning`)
        .addFields([{ name: "Warn", value: codeBlock(String(warn)) }])
        .setColor(client.config.colors.normal);
    warnLogs.send({ username: 'Cludo Logs', embeds: [embed] }).catch(console.error);
});

client.on('shardError', error => {
    console.error("Shard error:", error);
    const embed = new EmbedBuilder()
        .setTitle(`🚨・A websocket connection error occurred`)
        .addFields([
            { name: "Error", value: codeBlock(error?.message || "No message") },
            { name: "Stack", value: codeBlock(error?.stack || "No stack trace") }
        ])
        .setColor(client.config.colors.normal);
    consoleLogs.send({ username: 'Cludo Logs', embeds: [embed] }).catch(console.error);
});
