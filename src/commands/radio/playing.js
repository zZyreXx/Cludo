const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Radio information`,
        desc: `All info about the radio in this guild`,
        fields: [{
            name: "<:persn:1205425561720193046><:arrowright:1205414889451954196>Channel Listeners",
            value: `${interaction.member.voice.channel.members.size} listeners`,
            inline: true
        },
        {
            name: "<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Connected channel",
            value: `${interaction.member.voice.channel} (${interaction.member.voice.channel.name})`,
            inline: true
        },
        {
            name: "<:musicxxx:1205560766795882587><:arrowright:1205414889451954196>Radio Station",
            value: `[Club FM 99.6](https://clubfm.ae/)`,
            inline: true
        },
        ],
       type: 'editreply'
    }, interaction)
}

 
