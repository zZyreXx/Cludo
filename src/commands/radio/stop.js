const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ error: `The channel does not exist!`, type: 'editreply' }, interaction);

    client.radioStop(channel);

    var remove = await Schema.deleteOne({ Guild: interaction.guild.id });

    client.embed({
        title: `<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Radio stopped`,
        desc: `Radio has stopped successfully \nTo make the bot join do: \`rplay\``,
        fields: [{
            name: "<:persn:1205425561720193046><:arrowright:1205414889451954196>Stopped By",
            value: `${interaction.user}`,
            inline: true
        },
        {
            name: "<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Channel",
            value: `${channel}`,
            inline: true
        }
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Radio stopped`)
        .setDescription(`_______________ \n\nRadio has stopped successfully`)
        .addFields(
            { name: "<:grpcz:1205551958585249822><:arrowright:1205414889451954196>Stopped By", value: `${interaction.user}`, inline: true },
            { name: "<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Channel", value: `${channel}`, inline: true },
            { name: "<:settings:1205543029817999390><:arrowright:1205414889451954196>Guild", value: `${interaction.guild.name}`, inline: true },
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Cludo',
        embeds: [embed],
    });
}


 
