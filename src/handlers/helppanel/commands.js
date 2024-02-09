const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        {
            name: `<:activite:1205537677122994246><:arrowright:1205414889451954196>Activities`,
            value: `</activities:1071786540801462282>`,
            inline: true
        },
        {
            name: `<:afk:1205539497979289620><:arrowright:1205414889451954196>AFK`,
            value: `</afk help:1071786540801462283>`,
            inline: true
        },
        {
            name: `<:megaz:1205540030055981116><:arrowright:1205414889451954196>Announcement`,
            value: `</announcement help:1071786540801462284>`,
            inline: true
        },
        {
            name: `<:automod:1205540532206575666><:arrowright:1205414889451954196>Auto mod`,
            value: `</automod help:1071786540801462285>`,
            inline: true
        },
        {
            name: `<:settings:1205543029817999390><:arrowright:1205414889451954196>Auto setup`,
            value: `</automod help:1071786540801462285>`,
            inline: true
        },
        {
            name: `<:birthday1:1205543842904932372><:arrowright:1205414889451954196>Birthday`,
            value: `</birthdays help:1071786540801462287>`,
            inline: true
        },
        {
            name: `<:automod:1205540532206575666><:arrowright:1205414889451954196>Bot`,
            value: `</bot help:1071786540801462288>`,
            inline: true
        },
        {
            name: `<:heartxx:1205547235752804373><:arrowright:1205414889451954196>Casino`,
            value: `</casino help:1071786540801462289>`,
            inline: true
        },
        {
            name: `<:cofxz:1205548007085310073><:arrowright:1205414889451954196>Configuration`,
            value: `</config help:1071786540801462291>`,
            inline: true
        },
        {
            name: `<:slash:1205549360243548240><:arrowright:1205414889451954196>Custom cmds`,
            value: `</custom-commands help:1071786540801462290>`,
            inline: true
        },
        {
            name: `<:dev:1205404510697164820><:arrowright:1205414889451954196>Dcredits`,
            value: `</developers help:1071786541061513216>`,
            inline: true
        },
        {
            name: `<:mney:1205551391788113940><:arrowright:1205414889451954196>Economy`,
            value: `</economy help:1071786541061513217>`,
            inline: true
        },
        {
            name: `<:grpcz:1205551958585249822><:arrowright:1205414889451954196>Family`,
            value: `</family help:1071786541061513219>`,
            inline: true
        },
        {
            name: `<:funxxx:1205554067502268447><:arrowright:1205414889451954196>Fun`,
            value: `</fun help:1071786541061513220>`,
            inline: true
        },
        {
            name: `<:gamesz:1205554597993910313><:arrowright:1205414889451954196>Games`,
            value: `</games help:1071786541061513221>`,
            inline: true
        },
        {
            name: `<:tadxx:1205555120197345320><:arrowright:1205414889451954196>Giveaway`,
            value: `</giveaway help:1071786541061513222>`,
            inline: true
        },
        {
            name: `<:guildxx:1205555662008881182><:arrowright:1205414889451954196>Guild settings`,
            value: `</guild help:1071786541061513223>`,
            inline: true
        },
        {
            name: `<:imagexxc:1205556299908255824><:arrowright:1205414889451954196>Images`,
            value: `</images help:1071786541061513225>`,
            inline: true
        },
        {
            name: `<:linkee:1205416083469762610><:arrowright:1205414889451954196>Invites`,
            value: `</invites help:1071786541334151229>`,
            inline: true
        },
        {
            name: `<:lvlxz:1205557752345141268><:arrowright:1205414889451954196>Leveling`,
            value: `</levels help:1071786541334151230>`,
            inline: true
        },
        {
            name: `<:messagexxc:1205558617416400926><:arrowright:1205414889451954196>Messages`,
            value: `</messages help:1071786541334151232>`,
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
                    title: `<:__:1205407307811262466><:arrowright:1205414889451954196>Help panel`,
                    desc: `View all command categories in the bot here! \n\n[Website](https://cludobot.onrender.com/) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg/bot/)`,
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
                                    desc: `View all command categories in the bot here! \n\n[Website](https://cludobot.onrender.com/) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg/bot/)`,
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
                                    desc: `View all command categories in the bot here! \n\n[Website](https://cludobot.onrender.com/) | [Invite](${client.config.discord.botInvite}) | [Vote](https://top.gg/bot/)`,
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

 
