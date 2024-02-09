const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        {
            name: `<:tvzzz:1072024670125174794>┆Activities`,
            value: `\`/activities\``,
            inline: true
        },
        {
            name: `<:x_:1071781614423642193>┆AFK`,
            value: `\`/afk help\``,
            inline: true
        },
        {
            name: `<:ann:1071789734734610483>┆Announcement`,
            value: `\`/announcement help\``,
            inline: true
        },
        {
            name: `<:modzz:1072025354694295583>┆Auto mod`,
            value: `\`/automod help\``,
            inline: true
        },
        {
            name: `<:settingzz:1072016300848730182>┆Auto setup`,
            value: `\`/autosetup help\``,
            inline: true
        },
        {
            name: `<:burgirrr:1071793587739705344>┆Birthday`,
            value: `\`/birthdays help\``,
            inline: true
        },
        {
            name: `<:botzz:1071794843438825492>┆Bot`,
            value: `\`/bot help\``,
            inline: true
        },
        {
            name: `<:infinityzz:1071792533606244463>┆Casino`,
            value: `\`/casino help\``,
            inline: true
        },
        {
            name: `<:settingzz:1072016300848730182>┆Configuration`,
            value: `\`/config help\``,
            inline: true
        },
        {
            name: `<:compzz:1071795353445220432>┆Custom commands`,
            value: `\`/custom-commands help\``,
            inline: true
        },
        {
            name: `<:cre4doitz:1072026396307767346>┆Dcredits`,
            value: `\`/dcredits help\``,
            inline: true
        },
        {
            name: `<:moneyzz:1072026660188205208>┆Economy`,
            value: `\`/economy help\``,
            inline: true
        },
        {
            name: `<:memberzz:1071796953580572744>┆Family`,
            value: `\`/family help\``,
            inline: true
        },
        {
            name: `<:funzzz:1072027130034143262>┆Fun`,
            value: `\`/fun help\``,
            inline: true
        },
        {
            name: `<:gamepadzz:1072027350910390323>┆Games`,
            value: `\`/games help\``,
            inline: true
        },
        {
            name: `<:tdzz:1072018197269712967>┆Giveaway`,
            value: `\`/giveaway help\``,
            inline: true
        },
        {
            name: `<:settingzz:1072016300848730182>┆Guild settings`,
            value: `\`/guild help\``,
            inline: true
        },
        {
            name: `<:dangrr:1071791074173014158>┆Images`,
            value: `\`/images help\``,
            inline: true
        },
        {
            name: `<:linkee:1071784295594737768>┆Invites`,
            value: `\`/invites help\``,
            inline: true
        },
        {
            name: `<:cre4doitz:1072026396307767346>┆Leveling`,
            value: `\`/levels help\``,
            inline: true
        },
        {
            name: `<:chatzz:1071790624929501184>┆Messages`,
            value: `\`/messages help\``,
            inline: true
        },
        {
            name: `<:modzz:1072025354694295583>┆Moderation`,
            value: `\`/moderation help\``,
            inline: true
        },
        {
            name: `<:musicc:1072028279546064896>┆Music`,
            value: `\`/music help\``,
            inline: true
        },
        {
            name: `<:writezzz:1071792217888391270>┆Notepad`,
            value: `\`/notepad help\``,
            inline: true
        },
        {
            name: `<:memberzz:107179695┆Profile`,
            value: `\`/profile help\``,
            inline: true
        },
        {
            name: `<:tvzzz:1072024670125174794>┆Radio`,
            value: `\`/radio help\``,
            inline: true
        },
        {
            name: `<:rolezz:1072030311682158753>┆Reaction roles`,
            value: `\`/reactionroles help\``,
            inline: true
        },
        {
            name: `<:srchzz:1072030518834647070>┆Search`,
            value: `\`/search help\``,
            inline: true
        },
        {
            name: `<:upzzz:1071797858531016704>┆Server stats`,
            value: `\`/serverstats help\``,
            inline: true
        },
        {
            name: `<:settingzz:1072016300848730182>┆Setup`,
            value: `\`/setup help\``,
            inline: true
        },
        {
            name: `<:vczzz:1071797171948634266>┆Soundboard`,
            value: `\`/soundboard help\``,
            inline: true
        },
        {
            name: `<:chatzz:1071790624929501184>┆Sticky messages`,
            value: `\`/stickymessages help\``,
            inline: true
        },
        {
            name: `<:i_:1071780309865091173>┆Suggestions`,
            value: `\`/sugestions help\``,
            inline: true
        },
        {
            name: `<:heartzz:1072031623991808071>┆Thanks`,
            value: `\`/thanks help\``,
            inline: true
        },
        {
            name: `<:ticketzz:1071793049396584589>┆Tickets`,
            value: `\`/tickets help\``,
            inline: true
        },
        {
            name: `<:toolzzz:1071795700662272131>┆Tools`,
            value: `\`/tools help\``,
            inline: true
        },
        {
            name: `<:vczzz:1071797171948634266>┆Voice`,
            value: `\`/voice help\``,
            inline: true
        },
    ];

    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "commands-Bothelp") {
                interaction.deferUpdate();
                let page = 1;

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('helpPrev')
                            .setEmoji('⬅️')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setCustomId('helpNext')
                            .setEmoji('➡️')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setLabel("Invite")
                            .setURL(client.config.discord.botInvite)
                            .setStyle(Discord.ButtonStyle.Link),

                        new Discord.ButtonBuilder()
                            .setLabel("Support server")
                            .setURL(client.config.discord.serverInvite)
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('Navigation System')
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

                client.embed({
                    title: `<:helpzz:1072010469142974504>・Help panel`,
                    desc: `View all command categories in the bot here! \n\n[Website](https://Cludo.evilfoxzy.repl.co) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg/bot/)`,
                    image: "https://cdn.discordapp.com/attachments/1064478382504550400/1205446107279265812/CLUDO_1_2.png?ex=65d8662c&is=65c5f12c&hm=1dc3f94e83b96c83f3399ac2dafa88fa8c7a9479276a80371507b09e93e79950&",
                    fields: fields.slice(0, 24),
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message).then(msg => {
                    const filter = i => i.user.id === interaction.user.id;

                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });

                    collector.on('collect', async i => {
                        if (i.customId == "helpNext") {
                            if (page == 1) {
                                client.embed({
                                    title: `<:helpzz:1072010469142974504>・Help panel`,
                                    desc: `View all command categories in the bot here! \n\n[Website](https://Cludo.evilfoxzy.repl.co) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg/bot/)`,
                                    fields: fields.slice(25, 49),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page += 1;
                            }
                        }

                        else if (i.customId == "helpPrev") {
                            if (page == 2) {
                                client.embed({
                                    title: `<:helpzz:1072010469142974504>・Help panel`,
                                    desc: `View all command categories in the bot here! \n\n[Website](https://Cludo.evilfoxzy.repl.co) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg/bot/)`,
                                    fields: fields.slice(0, 24),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page -= 1;
                            }
                        }
                    });
                })
            }
        }
    }).setMaxListeners(0);
}

 
