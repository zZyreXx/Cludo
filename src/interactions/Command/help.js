const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with the bot'),
    
    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    
    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
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

        return client.embed({
            title: `<:i_:1205412741087494174><:arrowright:1205414889451954196>Help panel`,
            desc: `Welcome to Bot's help panel! We have made a small overview to help you! Make a choice via the menu below`,
            fields: [
                {
                    name: `<:x_:1205415513853927435><:arrowright:1205414889451954196>Menu doesn't work?`,
                    value: `Try resending the command. If you get no reaction, make sure you report the bug!`
                },
                {
                    name: `<:bugz:1205415768846499860><:arrowright:1205414889451954196>Found a bug?`,
                    value: `Report this with \`/report bug\``
                },
                {
                    name: `<:linkee:1205416083469762610><:arrowright:1205414889451954196>Links`,
                    value: `[Website](https://cludobot.onrender.com/) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg)`
                },
             ],
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};
