const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Simple in-memory birthday store (replace with MongoDB later)
const birthdayDB = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthdays')
        .setDescription('View or register a birthday')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about the birthdays category commands')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Check your birthday')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Delete your birthday')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Get to see all birthdays')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set your birthday')
                .addNumberOption(option =>
                    option.setName('day')
                        .setDescription('Day of your birthday (1-31)')
                        .setRequired(true)
                )
                .addNumberOption(option =>
                    option.setName('month')
                        .setDescription('Month of your birthday (1-12)')
                        .setRequired(true)
                )
        ),

    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const userId = interaction.user.id;
        const guildId = interaction.guildId;
        const sub = interaction.options.getSubcommand();

        // Ensure data exists
        if (!birthdayDB[guildId]) birthdayDB[guildId] = {};
        const guildBirthdays = birthdayDB[guildId];

        if (sub === 'help') {
            const embed = new EmbedBuilder()
                .setTitle('🎂 Birthday Commands')
                .setDescription([
                    '`/birthdays set` - Set your birthday',
                    '`/birthdays check` - See your saved birthday',
                    '`/birthdays delete` - Remove your birthday',
                    '`/birthdays list` - View all birthdays in the server',
                ].join('\n'))
                .setColor('Blue');
            return interaction.editReply({ embeds: [embed] });
        }

        if (sub === 'set') {
            const day = interaction.options.getNumber('day');
            const month = interaction.options.getNumber('month');

            if (day < 1 || day > 31 || month < 1 || month > 12) {
                return interaction.editReply("❌ Invalid day or month. Day must be 1-31 and month 1-12.");
            }

            guildBirthdays[userId] = { day, month };
            return interaction.editReply(`✅ Your birthday has been set to **${day}/${month}**.`);
        }

        if (sub === 'check') {
            const birthday = guildBirthdays[userId];
            if (!birthday) {
                return interaction.editReply("❌ You haven't set your birthday yet. Use `/birthdays set`.");
            }
            return interaction.editReply(`🎉 Your birthday is set to **${birthday.day}/${birthday.month}**.`);
        }

        if (sub === 'delete') {
            if (!guildBirthdays[userId]) {
                return interaction.editReply("❌ You don't have a birthday set.");
            }
            delete guildBirthdays[userId];
            return interaction.editReply("🗑️ Your birthday has been removed.");
        }

        if (sub === 'list') {
            const entries = Object.entries(guildBirthdays);
            if (entries.length === 0) {
                return interaction.editReply("📭 No birthdays have been set in this server yet.");
            }

            const formatted = entries
                .map(([id, { day, month }]) => `<@${id}> - **${day}/${month}**`)
                .join('\n');

            const embed = new EmbedBuilder()
                .setTitle("📅 Server Birthdays")
                .setDescription(formatted)
                .setColor("Gold");

            return interaction.editReply({ embeds: [embed] });
        }
    }
};
