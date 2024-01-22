const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('Bot-linkspanel')
                .setPlaceholder('<:helpzz:1072010469142974504>┆Nothing selected')
                .addOptions([
                    {
                        label: `Support server`,
                        description: `Join the suppport server`,
                        emoji: "<:helpzz:1072010469142974504>",
                        value: "support-linkspanel",
                    },
                    {
                        label: `Invite Bot`,
                        description: `Invite Bot to your server`,
                        emoji: "<:linkee:1071784295594737768>",
                        value: "invite-linkspanel",
                    },
                    {
                        label: `Community Server`,
                        description: `Join the community server!`,
                        emoji: "<:serverzz:1071796723128746084>",
                        value: "community-linkspanel",
                    },
                    {
                        label: `Top.gg`,
                        description: `Show the top.gg link`,
                        emoji: "<:botzz:1071794843438825492>",
                        value: "top.gg-linkspanel",
                    },
                ]),
        );

    client.embed({
        title: `<:linkee:1071784295594737768>・Links`,
        desc: `Get access to all Bot links! Choose the link you need in the menu below`,
        image: "https://cdn.discordapp.com/attachments/1064478382504550400/1072035974781091960/CLUDO-removebg-preview.png",
        components: [row],
        type: 'editreply'
    }, interaction)
}
