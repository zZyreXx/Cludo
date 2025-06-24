const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const customCommandSchema = require("../../database/models/customCommand");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('custom-commands')
        .setDescription('Create custom server commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get info about custom commands'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a new custom command')
                .addStringOption(opt => opt.setName('command').setDescription('Name of the command').setRequired(true))
                .addStringOption(opt => opt.setName('text').setDescription('Reply message').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Delete a custom command')
                .addStringOption(opt => opt.setName('command').setDescription('Name of the command').setRequired(true))),

    run: async (client, interaction) => {
        await interaction.deferReply();

        const sub = interaction.options.getSubcommand();
        const guildId = interaction.guild.id;

        // Permissions check
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.editReply({ content: '❌ You need Manage Messages permission to use this command.' });
        }

        if (sub === 'help') {
            const embed = new EmbedBuilder()
                .setTitle('🛠️ Custom Commands Help')
                .setDescription('Create commands specific to your server.')
                .addFields(
                    { name: '/custom-commands add', value: 'Add a new custom command' },
                    { name: '/custom-commands delete', value: 'Delete an existing custom command' }
                )
                .setColor('Blurple');
            return interaction.editReply({ embeds: [embed] });
        }

        if (sub === 'add') {
            const name = interaction.options.getString('command').toLowerCase();
            const response = interaction.options.getString('text');

            const existing = await customCommandSchema.findOne({ Guild: guildId, Command: name });
            if (existing) {
                return interaction.editReply(`❌ A custom command with the name \`${name}\` already exists.`);
            }

            await customCommandSchema.create({
                Guild: guildId,
                Command: name,
                Response: response
            });

            return interaction.editReply(`✅ Custom command \`${name}\` has been added.`);
        }

        if (sub === 'delete') {
            const name = interaction.options.getString('command').toLowerCase();
            const data = await customCommandSchema.findOneAndDelete({ Guild: guildId, Command: name });

            if (!data) {
                return interaction.editReply(`❌ No custom command found with the name \`${name}\`.`);
            }

            return interaction.editReply(`🗑️ Custom command \`${name}\` has been deleted.`);
        }
    }
};
