const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const messageId = interaction.options.getString('id');

    const editMessage = await interaction.channel.messages.fetch(messageId);

    client.embed({ 
        title: `<:megaz:1205540030055981116><:arrowright:1205414889451954196>Announcement!`, 
        desc: message,
        type: 'edit'
    }, editMessage);

    client.succNormal({
        text: `Announcement has been edit successfully!`,
        type: 'ephemeraledit'
    }, interaction);
}

 
