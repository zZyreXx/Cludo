const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel');

    // Mention @everyone outside the embed
    const everyoneMention = '@everyone';

    // Send the announcement with the embed
    client.embed({ 
        title: `<:megaz:1205540030055981116><:arrowright:1205414889451954196>Announcement!`, 
        desc: message 
    }, channel);

    // Send the announcement without the embed, mentioning @everyone
    await channel.send(`${everyoneMention}\n${message}`);

    client.succNormal({
        text: `Announcement has been sent successfully!`,
        fields: [
            {
                name: `<:megaz:1205540030055981116><:arrowright:1205414889451954196>Channel`,
                value: `${channel} (${channel.name})`
            }
        ],
        type: 'editreply'
    }, interaction);
}
