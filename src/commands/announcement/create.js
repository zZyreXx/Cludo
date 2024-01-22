const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel');

    client.embed({ 
        title: `<:ann:1071789734734610483>・Announcement!`, 
        desc: message 
    }, channel);

    client.succNormal({
        text: `Announcement has been sent successfully!`,
        fields: [
            {
                name: `<:chan:1071790232632041533>┆Channel`,
                value: `${channel} (${channel.name})`
            }
        ],
        type: 'editreply'
    }, interaction);
}
 
