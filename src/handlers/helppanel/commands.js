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
            name: `<:moderationcx:1205560124832485406><:arrowright:1205414889451954196>Moderation`,
            value: `</moderation help:1071786541334151233>`,
            inline: true
        },
        {
            name: `<:musicxxx:1205560766795882587><:arrowright:1205414889451954196>Music`,
            value: `</music help:1071786541334151234>`,
            inline: true
        },
        {
            name: `<:noepds:1205561401909710899><:arrowright:1205414889451954196>Notepad`,
            value: `</notepad help:1071786541334151235>`,
            inline: true
        },
        {
            name: `<:persn:1205425561720193046><:arrowright:1205414889451954196>Profile`,
            value: `</profile help:1071786541334151236>`,
            inline: true
        },
        {
            name: `<:radioxz:1205564682262413373><:arrowright:1205414889451954196>Radio`,
            value: `</radio play:1071786541334151237>`,
            inline: true
        },
        {
            name: `<:lightzz:1205565101499744377><:arrowright:1205414889451954196>Reaction roles`,
            value: `</reactionroles help:1071786541711626293>`,
            inline: true
        },
        {
            name: `<:searchcvx:1205565393666842724><:arrowright:1205414889451954196>Search`,
            value: `</search help:1071786541711626295>`,
            inline: true
        },
        {
            name: `<:stausvd:1205566175229251585><:arrowright:1205414889451954196>Server stats`,
            value: `</serverstats help:1071786541711626296>`,
            inline: true
        },
        {
            name: `<:multi:1205408937831309344><:arrowright:1205414889451954196>Setup`,
            value: `</setup help:1071786541711626297>`,
            inline: true
        },
        {
            name: `<:soundbaodxxx:1205566816907173948><:arrowright:1205414889451954196>Soundboard`,
            value: `</soundboard help:1071786541711626298>`,
            inline: true
        },
        {
            name: `<:messagexc:1205567224362958868><:arrowright:1205414889451954196>Sticky messages`,
            value: `</stickymessages help:1071786541711626299>`,
            inline: true
        },
        {
            name: `<:i_:1205412741087494174><:arrowright:1205414889451954196>Suggestions`,
            value: `</suggestions help:1071786541711626300>`,
            inline: true
        },
        {
            name: `<:lvlxz:1205557752345141268><:arrowright:1205414889451954196>Thanks`,
            value: `</thanks help:1071786541711626301>`,
            inline: true
        },
        {
            name: `<:ticketxv:1205568405160067072><:arrowright:1205414889451954196>Tickets`,
            value: `</tickets help:1071786541711626302>`,
            inline: true
        },
        {
            name: `<:guildxx:1205555662008881182><:arrowright:1205414889451954196>Tools`,
            value: `</tools help:1071786541879402577>`,
            inline: true
        },
        {
            name: `<:soundxz:1205569046276218910><:arrowright:1205414889451954196>Voice`,
            value: `</voice help:1071786541879402578>`,
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
                            .setEmoji('<:arrowleftxx:1209860372769804318>')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setCustomId('helpNext')
                            .setEmoji('<:arrwright:1209859403226808330>')
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
                                    title: `<:__:1205407307811262466>・Help panel`,
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
                                    title: `<:__:1205407307811262466>・Help panel`,
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

 
