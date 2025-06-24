const { CommandInteraction, Client, SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const model = require('../../database/models/badge');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('developers')
        .setDescription('Commands for the Bot developers')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about the developers category commands')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('eval')
                .setDescription('Get the result of a piece of code')
                .addStringOption(option =>
                    option.setName('code')
                        .setDescription('Your code')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('badge')
                .setDescription('Manage the bot badges')
                .addBooleanOption(option =>
                    option.setName('new')
                        .setDescription('Add or remove badge')
                        .setRequired(true)
                )
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('Select a user')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('badge')
                        .setDescription('Choose a badge type')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Manage the bot bans')
                .addBooleanOption(option =>
                    option.setName('new')
                        .setDescription('Ban or unban')
                        .setRequired(true)
                )
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('Select a user')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('credits')
                .setDescription('Manage the bot credits')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Add or remove credits')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Add', value: 'add' },
                            { name: 'Remove', value: 'remove' }
                        )
                )
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('Select a user')
                        .setRequired(true)
                )
                .addNumberOption(option =>
                    option.setName('amount')
                        .setDescription('Amount of credits')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('args')
                .setDescription('Post preset messages')
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('Choose a message to post')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Information', value: 'information' },
                            { name: 'Rules', value: 'rules' },
                            { name: 'Applications', value: 'applications' },
                            { name: 'Booster perks', value: 'boosterperks' },
                            { name: 'Links', value: 'links' },
                            { name: 'Rewards', value: 'rewards' },
                            { name: 'Our bots', value: 'ourbots' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('servers')
                .setDescription('See all servers from this shard')
        ),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const data = await model.findOne({ User: interaction.user.id });

            if (data?.FLAGS?.includes("DEVELOPER")) {
                await interaction.deferReply({ fetchReply: true });
                client.loadSubcommands(client, interaction, args);
            } else {
                return client.errNormal({
                    error: 'Only Bot developers are allowed to do this',
                    type: 'ephemeral'
                }, interaction);
            }
        } catch (err) {
            console.error("Developer check failed:", err);
            return client.errNormal({
                error: 'An error occurred while checking developer permissions.',
                type: 'ephemeral'
            }, interaction);
        }
    },
};
