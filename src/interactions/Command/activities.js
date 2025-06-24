const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('activities')
        .setDescription('Start a voice channel activity')
        .addStringOption(option =>
            option.setName('activity')
                .setDescription('The activity that you want to start')
                .setRequired(true)
                .addChoices(
                    { name: 'Betrayal.io', value: 'betrayal' },
                    { name: 'Checkers in the Park', value: 'checkers' },
                    { name: 'Chess in the Park', value: 'chess' },
                    { name: 'Doodle Crew', value: 'doodlecrew' },
                    { name: 'Fishington.io', value: 'fishington' },
                    { name: 'Letter League', value: 'letterleague' },
                    { name: 'Ocho', value: 'ocho' },
                    { name: 'Poker Night', value: 'poker' },
                    { name: 'Sketch Heads', value: 'sketchheads' },
                    { name: 'Spell Cast', value: 'spellcast' },
                    { name: 'Word Snacks', value: 'wordsnacks' },
                    { name: 'Watch Together', value: 'watchtogether' }
                )
        ),

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ fetchReply: true });

        const activity = interaction.options.getString('activity');
        const channel = interaction.member.voice.channel;

        if (!channel) {
            return client.errNormal({
                error: `You're not in a voice channel!`,
                type: 'editreply'
            }, interaction);
        }

        const activityMap = {
            betrayal:      { id: '773336526917861400', name: 'Betrayal.io' },
            checkers:      { id: '832013003968348200', name: 'Checkers in the Park' },
            chess:         { id: '832012586023256104', name: 'Chess in the Park' },
            doodlecrew:    { id: '878067389634314250', name: 'Doodle Crew' },
            fishington:    { id: '814288819477020702', name: 'Fishington.io' },
            letterleague:  { id: '879863686565621790', name: 'Letter League' },
            ocho:          { id: '832025144389533716', name: 'Ocho' },
            poker:         { id: '755827207812677713', name: 'Poker Night' },
            sketchheads:   { id: '902271654783242291', name: 'Sketch Heads' },
            spellcast:     { id: '852509694341283871', name: 'Spell Cast' },
            wordsnacks:    { id: '879863976006127627', name: 'Word Snacks' },
            watchtogether: { id: '880218394199220334', name: 'Watch Together' }
        };

        const selected = activityMap[activity];

        if (!selected) {
            return interaction.editReply({
                content: "❌ Unknown activity selected.",
                ephemeral: true
            });
        }

        try {
            if (typeof client.generateActivity === 'function') {
                await client.generateActivity(selected.id, selected.name, channel, interaction);
            } else {
                await interaction.editReply({
                    content: "❌ Activity system is not set up correctly (generateActivity missing).",
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error("Activity Error:", err);
            await interaction.editReply({
                content: "❌ Failed to start the activity.",
                ephemeral: true
            });
        }
    },
};
