const Discord = require('discord.js');

const Schema = require('../../database/models/votecredits');

const webhookClientLogs = new Discord.WebhookClient({
    id: "",
    token: "",
});

module.exports = async (client, interaction, args) => {
    const type = interaction.options.getString('type');
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getNumber('amount');

    if (type == "add") {
        Schema.findOne({ User: user.id }, async (err, data) => {
            if (data) {
                data.Credits += amount;
                data.save();
            }
            else {
                new Schema({
                    User: user.id,
                    Credits: amount
                }).save();
            }
        })

        client.succNormal({
            text: `Added **${amount} credits** to ${user}`,
            type: 'editreply'
        }, interaction);

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`<:funxxx:1205554067502268447><:arrowright:1205414889451954196>Credits added`)
            .setDescription(`Added credits to ${user} (${user.id})`)
            .addFields(
                { name: "<:persn:1205425561720193046><:arrowright:1205414889451954196>Added By", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: "<:noepds:1205561401909710899><:arrowright:1205414889451954196>Amount", value: `${amount}`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Credits',
            embeds: [embedLogs],
        });
    }
    else if (type == "remove") {
        Schema.findOne({ User: user.id }, async (err, data) => {
            if (data) {
                data.Credits -= amount;
                data.save();
            }
        })

        client.succNormal({
            text: `Removed **${amount} credits** from ${user}`,
            type: 'editreply'
        }, interaction);

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`<:funxxx:1205554067502268447><:arrowright:1205414889451954196>Credits removed`)
            .setDescription(`Removed credits from ${user} (${user.id})`)
            .addFields(
                { name: "<:persn:1205425561720193046><:arrowright:1205414889451954196>Removed By", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: "<:noepds:1205561401909710899><:arrowright:1205414889451954196>Amount", value: `${amount}`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Credits',
            embeds: [embedLogs],
        });
    }
}

 
