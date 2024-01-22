const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "<:logzz:1071794113982255134>・Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "<:logzz:1071794113982255134>┆Changelogs",
                value: '10/12/2022 - Updated the bot to the latest version of discord.js (v14)',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}
