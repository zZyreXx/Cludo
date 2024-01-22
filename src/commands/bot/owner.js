const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `<:logzz:1071794113982255134>・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "<:ownerzz:1071795933521645651>┆Owner name",
            value: `Corwin`,
            inline: true,
        },
        {
            name: "<:idzz:1071795045440704564>┆Discord tag",
            value: `@Tɑιғʏὗ™#7003`,
            inline: true,
        },
        {
            name: "<:compzz:1071795353445220432>┆Organization",
            value: `TEDX BOTZ`,
            inline: true,
        },
        {
            name: "<:serverzz:1071796723128746084>┆Website",
            value: `[https://](https://Cludo.yml)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 
