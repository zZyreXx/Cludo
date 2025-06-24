const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Manage the server announcements')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about the announcement category commands')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Make an announcement')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('Select a channel')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
                )
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('Your announcement message')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Edit an announcement (by message ID)')
                .addStringOption(option =>
                    option.setName('id')
                        .setDescription('ID of the message you want to edit')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('The new announcement content')
                        .setRequired(true)
                )
        ),

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const sub = interaction.options.getSubcommand();
        const member = interaction.member;

        // Check permissions
        if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.editReply({
                content: "❌ You don't have permission to manage messages."
            });
        }

        if (sub === 'help') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("📣 Announcement Command Help")
                        .setDescription([
                            "`/announcement create` - Send an announcement to a selected channel.",
                            "`/announcement edit` - Edit an existing announcement by message ID.",
                            "`/announcement help` - View this help message."
                        ].join("\n"))
                        .setColor("Blue")
                ]
            });
        }

        if (sub === 'create') {
            const channel = interaction.options.getChannel('channel');
            const message = interaction.options.getString('message');

            try {
                const sent = await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("📢 Announcement")
                            .setDescription(message)
                            .setColor("Gold")
                            .setFooter({ text: `Sent by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                    ]
                });

                return interaction.editReply({
                    content: `✅ Announcement sent to ${channel}!\nMessage ID: \`${sent.id}\``
                });
            } catch (err) {
                console.error(err);
                return interaction.editReply({
                    content: "❌ Failed to send announcement. Do I have permission to send messages in that channel?"
                });
            }
        }

        if (sub === 'edit') {
            const messageId = interaction.options.getString('id');
            const newMessage = interaction.options.getString('message');

            let found = false;

            for (const [channelId, channel] of interaction.guild.channels.cache) {
                if (channel.isTextBased()) {
                    try {
                        const msg = await channel.messages.fetch(messageId);
                        if (msg && msg.author.id === client.user.id) {
                            await msg.edit({
                                embeds: [
                                    new EmbedBuilder()
                                        .setTitle("📢 Announcement (edited)")
                                        .setDescription(newMessage)
                                        .setColor("Orange")
                                        .setFooter({ text: `Edited by ${interaction.user.tag}` })
                                ]
                            });

                            found = true;
                            return interaction.editReply({
                                content: `✅ Announcement edited in ${channel}.`
                            });
                        }
                    } catch {
                        // Do nothing; move to next channel
                    }
                }
            }

            if (!found) {
                return interaction.editReply({
                    content: "❌ Couldn't find that message in any channel, or it wasn't sent by me."
                });
            }
        }
    }
};
 
