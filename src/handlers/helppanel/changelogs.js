const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "changelogs-Bothelp") {
                interaction.deferUpdate();

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('Navigation System')
                            .addOptions([
                                {
                                    label: `Commands`,
                                    description: `Show the commands of Bot!`,
                                    emoji: "<:cmd:1205416566141886506>",
                                    value: "commands-Bothelp",
                                },
                                {
                                    label: `Invite`,
                                    description: `Invite Bot to your server`,
                                    emoji: "<:linkee:1205416083469762610>",
                                    value: "invite-Bothelp",
                                },
                                {
                                    label: `Support server`,
                                    description: `Join the suppport server`,
                                    emoji: "<:__:1205407307811262466>",
                                    value: "support-Bothelp",
                                },
                                {
                                    label: `Changelogs`,
                                    description: `Show the bot changelogs`,
                                    emoji: "<:i_:1205412741087494174>",
                                    value: "changelogs-Bothelp",
                                },
                            ]),
                    );

                client.embed({
                    title: "<:i_:1205412741087494174><:arrowright:1205414889451954196>Changelogs",
                    desc: `_____`,
                    thumbnail: client.user.avatarURL({ size: 1024 }),
                    fields: [
            	        {
                            name: "<:megaz:1205540030055981116><:arrowright:1205414889451954196>Alert!",
                            value: 'This is the changelogs of the bot, here you can see the changes that have been made to the bot.',
                            inline: false,
                        },
                        {
                            name: "<:i_:1205412741087494174><:arrowright:1205414889451954196>Changelogs",
                            value: '24/01/2024 - Added [Mallu Radio Station Club FM 99.6](https://clubfm.ae/)\n -Updated To new UI',
                            inline: false,
                        }
                    ],
                    components: [row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    }).setMaxListeners(0);
}

 
