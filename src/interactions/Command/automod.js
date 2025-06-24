const { SlashCommandBuilder, ChannelType, PermissionsBitField, EmbedBuilder } = require('discord.js');

// In-memory storage (replace with DB if needed)
const settings = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Manage the auto mod')
        .addSubcommand(subcommand =>
            subcommand.setName('help').setDescription('Get information about auto moderation commands')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('antiinvite')
                .setDescription('Enable/disable anti-invite')
                .addBooleanOption(option => option.setName('active').setDescription('Enable or disable').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand.setName('antilinks')
                .setDescription('Enable/disable antilinks')
                .addBooleanOption(option => option.setName('active').setDescription('Enable or disable').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand.setName('antispam')
                .setDescription('Enable/disable antispam')
                .addBooleanOption(option => option.setName('active').setDescription('Enable or disable').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand.setName('linkschannel')
                .setDescription('Allow or disallow links in a channel')
                .addStringOption(option => 
                    option.setName('type')
                        .setDescription('Add or Remove the channel')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Add', value: 'add' },
                            { name: 'Remove', value: 'remove' }
                        ))
                .addChannelOption(option => 
                    option.setName('channel')
                        .setDescription('Select the text channel')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommandGroup(group =>
            group.setName('blacklist')
                .setDescription('Manage blacklist words')
                .addSubcommand(sub =>
                    sub.setName('display').setDescription('Show all blacklisted words'))
                .addSubcommand(sub =>
                    sub.setName('add')
                        .setDescription('Add a word to the blacklist')
                        .addStringOption(option => option.setName('word').setDescription('Word to block').setRequired(true)))
                .addSubcommand(sub =>
                    sub.setName('remove')
                        .setDescription('Remove a word from the blacklist')
                        .addStringOption(option => option.setName('word').setDescription('Word to unblock').setRequired(true)))
        ),

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const { options, guild, member } = interaction;
        const sub = options.getSubcommand();
        const group = options.getSubcommandGroup(false);
        const guildId = guild.id;

        // Permission check
        if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.editReply("❌ You do not have permission to manage messages.");
        }

        // Setup settings if missing
        if (!settings[guildId]) {
            settings[guildId] = {
                antiinvite: false,
                antilinks: false,
                antispam: false,
                whitelistChannels: [],
                blacklist: []
            };
        }

        const config = settings[guildId];

        // HELP
        if (sub === 'help') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("🛡️ AutoMod Help")
                        .setDescription([
                            "`/automod antiinvite` - Toggle Discord invite blocking",
                            "`/automod antilinks` - Toggle general link blocking",
                            "`/automod antispam` - Toggle spam protection",
                            "`/automod linkschannel` - Allow specific channel to bypass link filter",
                            "`/automod blacklist` - Manage blacklisted words"
                        ].join('\n'))
                        .setColor("Blue")
                ]
            });
        }

        // BOOLEAN TOGGLES
        if (['antiinvite', 'antilinks', 'antispam'].includes(sub)) {
            const value = options.getBoolean('active');
            config[sub] = value;
            return interaction.editReply(`✅ \`${sub}\` has been **${value ? "enabled" : "disabled"}**.`);
        }

        // LINK EXEMPTIONS
        if (sub === 'linkschannel') {
            const type = options.getString('type');
            const channel = options.getChannel('channel');

            if (type === 'add') {
                if (!config.whitelistChannels.includes(channel.id)) {
                    config.whitelistChannels.push(channel.id);
                }
                return interaction.editReply(`✅ ${channel} is now **allowed** to post links.`);
            } else {
                config.whitelistChannels = config.whitelistChannels.filter(id => id !== channel.id);
                return interaction.editReply(`✅ ${channel} is now **not allowed** to post links.`);
            }
        }

        // BLACKLIST COMMAND GROUP
        if (group === 'blacklist') {
            if (sub === 'display') {
                if (!config.blacklist.length) {
                    return interaction.editReply("🚫 No words are blacklisted.");
                }

                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("🚫 Blacklisted Words")
                            .setDescription(config.blacklist.map(w => `• \`${w}\``).join('\n'))
                            .setColor("Red")
                    ]
                });
            }

            const word = options.getString('word').toLowerCase();

            if (sub === 'add') {
                if (config.blacklist.includes(word)) {
                    return interaction.editReply("⚠️ That word is already blacklisted.");
                }
                config.blacklist.push(word);
                return interaction.editReply(`✅ Added \`${word}\` to the blacklist.`);
            }

            if (sub === 'remove') {
                if (!config.blacklist.includes(word)) {
                    return interaction.editReply("⚠️ That word isn't in the blacklist.");
                }
                config.blacklist = config.blacklist.filter(w => w !== word);
                return interaction.editReply(`✅ Removed \`${word}\` from the blacklist.`);
            }
        }
    }
};
 
