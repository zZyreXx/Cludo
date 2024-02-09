const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "support-Bothelp") {
                interaction.deferUpdate();

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('Navigation System')
                            .addOptions([
                                {
                                    label: `Commands`,
                                    description: `Show the commands of ${client.user.username}!`,
                                    emoji: "<:compzz:1071795353445220432>",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Invite`,
                                    description: `Invite ${client.user.username} to your server`,
                                    emoji: "<:linkee:1071784295594737768>",
                                    value: "invite-Bothelp",
                                },
                                {
                                    label: `Support server`,
                                    description: `Join the suppport server`,
                                    emoji: "<:helpzz:1072010469142974504>",
                                    value: "support-Bothelp",
                                },
                                {
                                    label: `Changelogs`,
                                    description: `Show the ${client.user.username} changelogs`,
                                    emoji: "<:i_:1071780309865091173>",
                                    value: "changelogs-Bothelp",
                                },
                            ]),
                    );

                let row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Support server")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `<:helpzz:1072010469142974504>・Support`,
                    desc: `Make your server even better with ${client.user.username}!`,
                    image: "https://cdn.discordapp.com/attachments/1064478382504550400/1205446107279265812/CLUDO_1_2.png?ex=65d8662c&is=65c5f12c&hm=1dc3f94e83b96c83f3399ac2dafa88fa8c7a9479276a80371507b09e93e79950&",
                    url: client.config.discord.serverInvite,
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    }).setMaxListeners(0);
}

 
