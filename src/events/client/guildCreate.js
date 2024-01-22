const Discord = require('discord.js');

const Functions = require("../../database/models/functions");

module.exports = async (client, guild) => {
    const webhookClient = new Discord.WebhookClient({
        id: client.webhooks.serverLogs.id,
        token: client.webhooks.serverLogs.token,
    });

    if (guild == undefined) return;

    new Functions({
        Guild: guild.id,
        Prefix: client.config.discord.prefix
    }).save();

    try {
        const promises = [
            client.shard.broadcastEval(client => client.guilds.cache.size),
            client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];
        Promise.all(promises)
            .then(async (results) => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const embed = new Discord.EmbedBuilder()
                    .setTitle("🟢・Added to a new server!")
                    .addFields(
                        { name: "Total servers:", value: `${totalGuilds}`, inline: true },
                        { name: "Server name", value: `${guild.name}`, inline: true },
                        { name: "Server ID", value: `${guild.id}`, inline: true },
                        { name: "Server members", value: `${guild.memberCount}`, inline: true },
                        { name: "Server owner", value: `<@!${guild.ownerId}> (${guild.ownerId})`, inline: true },
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/1064478382504550400/1072035974781091960/CLUDO-removebg-preview.png")
                    .setColor(client.config.colors.normal)
                webhookClient.send({
                    username: 'Cludo',
                    avatarURL: client.user.avatarURL(),
                    embeds: [embed],
                });
            })

        let defaultChannel = "";
        guild.channels.cache.forEach((channel) => {
            if (channel.type == Discord.ChannelType.GuildText && defaultChannel == "") {
                if (channel.permissionsFor(guild.members.me).has(Discord.PermissionFlagsBits.SendMessages)) {
                    defaultChannel = channel;
                }
            }
        })

        let row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Invite")
                    .setURL(client.config.discord.botInvite)
                    .setStyle(Discord.ButtonStyle.Link),

                new Discord.ButtonBuilder()
                    .setLabel("Support server")
                    .setURL(client.config.discord.serverInvite)
                    .setStyle(Discord.ButtonStyle.Link),
            );

        client.embed({
            title: "Thanks for inviting the bot!",
            image: "https://cdn.discordapp.com/attachments/1064478382504550400/1072035974781091960/CLUDO-removebg-preview.png",
            fields: [{
                name: "<:helpzz:1072010469142974504>┆How to setup?",
                value: 'The default prefix = \`/\` \nTo run setups with Bot run \`/setup\`',
                inline: false,
            },
            {
                name: "<:i_:1071780309865091173>┆I need help what now?",
                value: `You can DM <@755297485328482356> for support or joining the [[Support server]](${client.config.discord.serverInvite})`,
                inline: false,
            },
            {
                name: "<:compzz:1071795353445220432>┆What are the commands?",
                value: 'See that list of commands by doing \`/help\`',
                inline: false,
            },
            {
                name: "<:linkee:1071784295594737768>┆Invite the bot!",
                value: `Invite the bot to click [[HERE]](${client.config.discord.botInvite})`,
                inline: false,
            },
            ],
            components: [row], 
        }, defaultChannel)
    }
    catch (err) {
        console.log(err);
    }


};
