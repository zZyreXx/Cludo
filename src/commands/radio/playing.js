const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `<:tvzzz:1072024670125174794>・Radio information`,
        desc: `All info about the radio in this guild`,
        fields: [{
            name: "<:memberzz:1071796953580572744>┆Channel Listeners",
            value: `${interaction.member.voice.channel.members.size} listeners`,
            inline: true
        },
        {
            name: "<:tvzzz:1072024670125174794>┆Connected channel",
            value: `${interaction.member.voice.channel} (${interaction.member.voice.channel.name})`,
            inline: true
        },
        {
            name: "<:musicc:1072028279546064896>┆Radio Station",
            value: `[Club FM 94.3](https://www.clubfm.in/)`,
            inline: true
        },
        ],
       type: 'editreply'
    }, interaction)
}

 
