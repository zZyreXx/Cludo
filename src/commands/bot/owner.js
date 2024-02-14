const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "<:dev:1205404510697164820><:arrowright:1205414889451954196>Owner name",
            value: `tɑιғʏὗ™`,
            inline: true,
        },
        {
            name: "<:funxxx:1205554067502268447><:arrowright:1205414889451954196>Discord tag",
            value: `@Tɑιғʏὗ™#7003`,
            inline: true,
        },
        {
            name: "<:stausvd:1205566175229251585><:arrowright:1205414889451954196>Organization",
            value: `TEDX BOTZ`,
            inline: true,
        },
        {
            name: "<:globe:1205409366849888307><:arrowright:1205414889451954196>Website",
            value: `[cludo.com](https://cludobot.onrender.com/)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 
