const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ text: `The channel does not exist!`, type: 'editreply' }, interaction);

    client.radioStart(channel);

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.Channel = channel.id;
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
        }
    })

    client.embed({
        title: `<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Started radio`,
        desc: `Radio has started successfully \nTo make the bot leave do: \`rleave\``,
        fields: [{
            name: "<:persn:1205425561720193046><:arrowright:1205414889451954196>Started By",
            value: `${interaction.user}`,
            inline: true
        },
        {
            name: "<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Channel",
            value: `${channel}`,
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

    let embed = new Discord.EmbedBuilder()
        .setTitle(`<:tvzzz:1072024670125174794>・Started radio`)
        .setDescription(`_______________ \n\nRadio has started successfully`)
        .addFields(
            { name: "<:memberzz:1071796953580572744>┆Started By", value: `${interaction.user}`, inline: true },
            { name: "<:tvzzz:1072024670125174794>┆Channel", value: `${channel}`, inline: true },
            { name: "<:settingzz:1072016300848730182>┆Guild", value: `${interaction.guild.name}`, inline: true },
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Cludo',
        embeds: [embed],
    });
}

 
 
