const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");

            client.embed({
                title: `<:i_:1205412741087494174><:arrowright:1205414889451954196>Bot information`,
                desc: `____________________________`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
               {
                    name: "<:i_:1205412741087494174><:arrowright:1205414889451954196>Information",
                    value: `Bot is a bot with which you can run your entire server! With no less than 350+ commands, we have a large bot with many options to improve your server!`,
                    inline: false,
                },
                {
                    name: "_____ \n\n<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>General",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<:automod:1205540532206575666><:arrowright:1205414889451954196>Bot name",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "<:persn:1205425561720193046><:arrowright:1205414889451954196>Bot id",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "<:round:1205428303150714880><:arrowright:1205414889451954196>Shards",
                    value: `\`${client.options.shardCount}\` shards`,
                    inline: true,
                },
                {
                    name: "<:lvlxz:1205557752345141268><:arrowright:1205414889451954196>Bot owner",
                    value: `<@!790541561111904266> `,
                    inline: true,
                },
                {
                    name: "<:dev:1205404510697164820><:arrowright:1205414889451954196>Bot developer",
                    value: `<@!790541561111904266>`,
                    inline: true,
                },
                {
                    name: "<:messagexc:1205567224362958868><:arrowright:1205414889451954196>Commands",
                    value: `\`${client.commands.size}\` commands`,
                    inline: true,
                },
                {
                    name: "<:globe:1205409366849888307><:arrowright:1205414889451954196>Servers",
                    value: `\`${totalGuilds}\` servers`,
                    inline: true,
                },
                {
                    name: "<:globe:1205409366849888307><:arrowright:1205414889451954196>Servers on shard",
                    value: `\`${client.guilds.cache.size}\` servers`,
                    inline: true,
                },
                {
                    name: "<:grpcz:1205551958585249822><:arrowright:1205414889451954196>Members",
                    value: `\`${totalMembers}\` members`,
                    inline: true,
                },
                {
                    name: "<:soundxz:1205569046276218910><:arrowright:1205414889451954196>Connected channels",
                    value: `\`${totalVoice}\` channels`,
                    inline: true,
                },
                {
                    name: "<:megaz:1205540030055981116><:arrowright:1205414889451954196>Channels",
                    value: `\`${totalChannels}\` channels`,
                    inline: true,
                },
                {
                    name: "<:noepds:1205561401909710899><:arrowright:1205414889451954196>Created",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "_____ \n\n<:cofxz:1205548007085310073><:arrowright:1205414889451954196>System",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<:status:1205426484223938580><:arrowright:1205414889451954196>Uptime",
                    value: `${duration}`,
                    inline: true,
                },
                {
                    name: "<:guildxx:1205555662008881182><:arrowright:1205414889451954196>API speed:",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "<:settings:1205543029817999390><:arrowright:1205414889451954196>Bot Version",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "<:lightzz:1205565101499744377><:arrowright:1205414889451954196>Node.js Version",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "<:cofxz:1205548007085310073><:arrowright:1205414889451954196>Discord.js Version",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "<:imagexxc:1205556299908255824><:arrowright:1205414889451954196>Bot memory",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
                    inline: true,
                },
                {
                    name: "<:linkee:1205416083469762610><:arrowright:1205414889451954196>Links",
                    value: `Add me: [[HERE]](${client.config.discord.botInvite}) \nSupport server: [[HERE]](${client.config.discord.serverInvite})`,
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}

 
