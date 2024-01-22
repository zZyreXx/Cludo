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
        title: `・Radio stopped`,
        desc: `Radio has stopped successfully \nTo make the bot join do: \`rplay\``,
        fields: [{
            name: "<:memberzz:1071796953580572744>┆Stopped By",
            value: `${interaction.user}`,
            inline: true
        },
        {
            name: "<:tvzzz:1072024670125174794>┆Channel",
            value: `${channel}`,
            inline: true
        }
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`<:tvzzz:1072024670125174794>・Radio stopped`)
        .setDescription(`_______________ \n\nRadio has stopped successfully`)
        .addFields(
            { name: "<:memberzz:1071796953580572744>┆Stopped By", value: `${interaction.user}`, inline: true },
            { name: "<:tvzzz:1072024670125174794>┆Channel", value: `${channel}`, inline: true },
            { name: "<:settingzz:1072016300848730182>┆Guild", value: `${interaction.guild.name}`, inline: true },
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Cluzo',
        embeds: [embed],
    });
}

