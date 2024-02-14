const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "1109817268659036161",
    token: "AL_H1FIyvvzpyT2tTB7UgWYoGJn59YqQznzcIiIjvOvYd6t-GnpgGcuDw019UYRPxaXT",
});

module.exports = async (client, interaction, args) => {
    const feedback = interaction.options.getString('feedback');

    const embed = new Discord.EmbedBuilder()
        .setTitle(`<:messagexxc:1205558617416400926><:arrowright:1205414889451954196>New feedback!`)
        .addFields(
            { name: "User", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        )
        .setDescription(`${feedback}`)
        .setColor(client.config.colors.normal)
    webhookClient.send({
        username: 'Bot Feedback',
        embeds: [embed],
    });

    client.succNormal({ 
        text: `Feedback successfully sent to the developers`,
        type: 'editreply'
    }, interaction);
}
