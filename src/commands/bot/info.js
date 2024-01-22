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
                title: `ℹ・Bot information`,
                desc: `____________________________`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
               {
                    name: "ℹ️┆Information",
                    value: `Bot is a bot with which you can run your entire server! With no less than 350+ commands, we have a large bot with many options to improve your server!`,
                    inline: false,
                },
                {
                    name: "_____ \n\n│General",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<:botzz:1071794843438825492>┆Bot name",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "<:idzz:1071795045440704564>┆Bot id",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "<:compzz:1071795353445220432>┆Shards",
                    value: `\`${client.options.shardCount}\` shards`,
                    inline: true,
                },
                {
                    name: "<:ownerzz:1071795933521645651>┆Bot owner",
                    value: `<@!790541561111904266> `,
                    inline: true,
                },
                {
                    name: "<:devzz:1071796245699494019>┆Bot developer",
                    value: `<@!790541561111904266> <@!852790941918953482>`,
                    inline: true,
                },
                {
                    name: "<:compzz:1071795353445220432>┆Commands",
                    value: `\`${client.commands.size}\` commands`,
                    inline: true,
                },
                {
                    name: "<:serverzz:1071796723128746084>┆Servers",
                    value: `\`${totalGuilds}\` servers`,
                    inline: true,
                },
                {
                    name: "<:serverzz:1071796723128746084>┆Servers this shard",
                    value: `\`${client.guilds.cache.size}\` servers`,
                    inline: true,
                },
                {
                    name: "<:memberzz:1071796953580572744>┆Members",
                    value: `\`${totalMembers}\` members`,
                    inline: true,
                },
                {
                    name: "<:vczzz:1071797171948634266>┆Connected channels",
                    value: `\`${totalVoice}\` channels`,
                    inline: true,
                },
                {
                    name: "<:chan:1071790232632041533>┆Channels",
                    value: `\`${totalChannels}\` channels`,
                    inline: true,
                },
                {
                    name: "<:calenderzz:1071797419089612900>┆Created",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "_____ \n\n│System",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "<:upzzz:1071797858531016704>┆Uptime",
                    value: `${duration}`,
                    inline: true,
                },
                {
                    name: "<:clockzz:1071798302741373008>┆API speed:",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "<:jsszz:1071798658409967747>┆Bot Version",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "<:jsszz:1071798658409967747>┆Node.js Version",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "<:folderr:1071798946688680027>┆Discord.js Version",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "<:savezz:1071799231297368104>┆Bot memory",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
                    inline: true,
                },
                {
                    name: "<:linkee:1071784295594737768>┆Links",
                    value: `Add me: [[HERE]](${client.config.discord.botInvite}) \nSupport server: [[HERE]](${client.config.discord.serverInvite})`,
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}

 
