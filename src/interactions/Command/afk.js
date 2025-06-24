const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Temporary AFK store — replace with your DB logic if needed
const afkMap = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set your AFK status')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about AFK commands')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Mark yourself as AFK')
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('Why are you going AFK?')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Show all AFK users in this server')
        ),

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const { options, guild, user } = interaction;
        const sub = options.getSubcommand();

        if (sub === 'help') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("AFK Command Help")
                        .setDescription([
                            "`/afk set [reason]` - Set yourself as AFK with optional reason.",
                            "`/afk list` - View who is currently AFK in the server.",
                            "`/afk help` - View this help message."
                        ].join('\n'))
                        .setColor("Blue")
                ]
            });
        }

        if (sub === 'set') {
            const reason = options.getString('reason') || "No reason provided.";
            afkMap.set(user.id, {
                username: user.username,
                reason: reason,
                timestamp: Date.now()
            });

            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`You are now AFK`)
                        .setDescription(`**Reason:** ${reason}`)
                        .setColor("Yellow")
                ]
            });
        }

        if (sub === 'list') {
            const entries = [...afkMap.entries()]
                .filter(([id, data]) => guild.members.cache.has(id));

            if (!entries.length) {
                return interaction.editReply({
                    content: "🚫 No AFK users in this server."
                });
            }

            const embed = new EmbedBuilder()
                .setTitle("AFK Users")
                .setColor("Yellow");

            entries.forEach(([id, data]) => {
                embed.addFields({
                    name: data.username,
                    value: `**Reason:** ${data.reason}`,
                    inline: false
                });
            });

            return interaction.editReply({ embeds: [embed] });
        }
    }
};
