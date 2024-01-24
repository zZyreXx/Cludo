const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "<:logzz:1071794113982255134>・Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "<:logzz:1071794113982255134>┆Changelogs",
                value: '10/12/2022 - Added Mallu Radio Station MAcfast 90.4a',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}
