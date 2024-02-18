const Discord = require('discord.js');

const Schema = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const type = interaction.options.getString('type');
    const message = interaction.options.getString('message');

    if (type == "open") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.openTicket = "Thanks for creating a ticket! \nSupport will be with you shortly \n\n🔒 - Close ticket \n✋ - Claim ticket \n📝 - Save transcript \n🔔 - Send a notification";
                data.save();

                client.succNormal({
                    text: `The ticket message has been set successfully`,
                    fields: [
                        {
                            name: `<:i_:1205412741087494174><:arrowright:1205414889451954196>Message type`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `<:arrowright:1205414889451954196><:arrowright:1205414889451954196>Message`,
                            value: `${data.openTicket}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `No ticket message data found!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.openTicket = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    openTicket: message
                }).save();
            }
        })

        client.succNormal({
            text: `The ticket message has been set successfully`,
            fields: [
                {
                    name: `<:i_:1205412741087494174><:arrowright:1205414889451954196>Message type`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `<:messagexxc:1205558617416400926><:arrowright:1205414889451954196>Message`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
    else if (type == "close") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.dmMessage = "Here is the transcript for your ticket, please keep this if you ever want to refer to it!";
                data.save();

                client.succNormal({
                    text: `The ticket message has been set successfully`,
                    fields: [
                        {
                            name: `<:i_:1205412741087494174><:arrowright:1205414889451954196>Message type`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `<:messagexxc:1205558617416400926><:arrowright:1205414889451954196>Message`,
                            value: `${data.dmMessage}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `No ticket message data found!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.dmMessage = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    dmMessage: message
                }).save();
            }
        })

        client.succNormal({
            text: `The ticket message has been set successfully`,
            fields: [
                {
                    name: `<:i_:1205412741087494174><:arrowright:1205414889451954196>Message type`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `<:messagexxc:1205558617416400926><:arrowright:1205414889451954196>Message`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}

 
