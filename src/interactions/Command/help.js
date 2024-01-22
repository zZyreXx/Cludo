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
                    .setPlaceholder('❌┆Nothing selected')
                    .addOptions([
                        {
                            label: `Commands`,
                            description: `Show the commands of Bot!`,
                            emoji: "<:compzz:1071795353445220432>",
                            value: "commands-Bothelp",
                        },
                        {
                            label: `Invite`,
                            description: `Invite Bot to your server`,
                            emoji: "<:linkee:1071784295594737768>",
                            value: "invite-Bothelp",
                        },
                        {
                            label: `Support server`,
                            description: `Join the suppport server`,
                            emoji: "<:helpzz:1072010469142974504>",
                            value: "support-Bothelp",
                        },
                        {
                            label: `Changelogs`,
                            description: `Show the bot changelogs`,
                            emoji: "<:i_:1071780309865091173>",
                            value: "changelogs-Bothelp",
                        },
                    ]),
            );

        return client.embed({
            title: `<:i_:1071780309865091173>・Help panel`,
            desc: `Welcome to Bot's help panel! We have made a small overview to help you! Make a choice via the menu below`,
            image: "https://cdn.discordapp.com/attachments/1064478382504550400/1072035974781091960/CLUDO-removebg-preview.png",
            fields: [
                {
                    name: `<:x_:1071781614423642193>┆Menu doesn't work?`,
                    value: `Try resending the command. If you get no reaction, make sure you report the bug!`
                },
                {
                    name: `<:bb:1071783760502198323>┆Found a bug?`,
                    value: `Report this with \`/report bug\``
                },
                {
                    name: `<:linkee:1071784295594737768>┆Links`,
                    value: `[Website](https://google.com) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg)`
                },
            ],
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};

 
