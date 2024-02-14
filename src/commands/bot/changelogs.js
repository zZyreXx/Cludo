const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "<:settings:1205543029817999390><:arrowright:1205414889451954196> Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "<:multi:1205408937831309344><:arrowright:1205414889451954196>Changelogs",
                value: '24/01/2024 - Added [Mallu Radio Station Club FM 99.6](https://clubfm.ae/)\n -Fixed Minor Bugs\n -Changed Host\n -Updated bot Latest Disocrd.js/Music Version 0.16.1',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}
