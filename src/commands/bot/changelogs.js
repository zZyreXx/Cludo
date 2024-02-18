const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "<:settings:1205543029817999390><:arrowright:1205414889451954196> Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "<:multi:1205408937831309344><:arrowright:1205414889451954196>Changelogs",
                value: '24/01/2024 - No info From the Dev',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}
