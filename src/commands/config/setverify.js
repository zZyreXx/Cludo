const Discord = require('discord.js');

const Schema = require("../../database/models/verify");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const boolean = interaction.options.getBoolean('enable');
    const channel = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');

    if (boolean == true) {
        const data = await Schema.findOne({ Guild: interaction.guild.id });
        if (data) {
            data.Channel = channel.id;
            data.Role = role.id
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Role: role.id
            }).save();
        }

        client.succNormal({
            text: `Verify panel has been successfully created`,
            fields: [
                {
                    name: `<:chan:1071790232632041533>┆Channel`,
                    value: `${channel} (${channel.name})`,
                    inline: true
                },
                {
                    name: `<:idzz:1071795045440704564>┆Role`,
                    value: `${role} (${role.name})`,
                    inline: true
                }
            ],
            type: 'editreply'
        }, interaction);

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('Bot_verify')
                    .setEmoji('<:tyickzz:1072014555464605728>')
                    .setStyle(Discord.ButtonStyle.Success),
            );

        client.embed({
            title: `${interaction.guild.name}・verify`,
            desc: `Click on the button to verify yourself`,
            components: [row]
        }, channel)
    }
}

 
