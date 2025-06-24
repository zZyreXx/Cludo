const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

// In-memory config (use DB for production)
const setupData = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autosetup')
        .setDescription('Let the bot setup automatically')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about the auto setup commands')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('logs')
                .setDescription('Set the logs from the server')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('The setup that you want')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Server logs', value: 'serverLogs' },
                            { name: 'Level logs', value: 'levelLogs' },
                            { name: 'Boost logs', value: 'boostLogs' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fun')
                .setDescription('Set the fun channels from the server')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('The setup that you want')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Birthdays', value: 'birthdays' },
                            { name: 'Chatbot', value: 'chatbot' },
                            { name: 'Reviews', value: 'reviews' },
                            { name: 'Suggestions', value: 'suggestions' },
                            { name: 'Starboard', value: 'starboard' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Set the game channels from the server')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('The setup that you want')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Counting', value: 'counting' },
                            { name: 'Guess the number', value: 'gtn' },
                            { name: 'Guess the word', value: 'gtw' },
                            { name: 'Word snake', value: 'wordsnake' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcome')
                .setDescription('Setup the welcome system')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('The setup that you want')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Welcome channel', value: 'welcomechannel' },
                            { name: 'Welcome role', value: 'welcomerole' },
                            { name: 'Leave channnel', value: 'leavechannel' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Set the custom voice channels from the server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('Set the ticket panel from the server')
        ),

    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const member = interaction.member;
        const sub = interaction.options.getSubcommand();
        const setupOption = interaction.options.getString('setup');
        const guildId = interaction.guildId;

        // Permission check
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.editReply("❌ You must be an administrator to use this command.");
        }

        // Setup data holder
        if (!setupData[guildId]) setupData[guildId] = {};

        if (sub === 'help') {
            const embed = new EmbedBuilder()
                .setTitle("🛠️ Auto Setup Help")
                .setDescription([
                    "`/autosetup logs` - Configure logging channels",
                    "`/autosetup fun` - Set up fun features like birthdays, chatbot, etc.",
                    "`/autosetup games` - Set up game channels",
                    "`/autosetup welcome` - Set welcome/leave messages or roles",
                    "`/autosetup customvoice` - Configure auto voice channels",
                    "`/autosetup ticketpanel` - Set up ticket system"
                ].join("\n"))
                .setColor("Blue");

            return interaction.editReply({ embeds: [embed] });
        }

        if (['logs', 'fun', 'games', 'welcome'].includes(sub)) {
            setupData[guildId][sub] = setupOption;
            return interaction.editReply(`✅ Setup for **${sub}** has been configured to \`${setupOption}\`.`);
        }

        if (sub === 'customvoice') {
            setupData[guildId].customvoice = true;
            return interaction.editReply("🎤 Custom voice channels setup enabled.");
        }

        if (sub === 'ticketpanel') {
            setupData[guildId].ticketpanel = true;
            return interaction.editReply("🎟️ Ticket panel setup has been initiated.");
        }
    }
};
