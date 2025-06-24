const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment'); // optional, for uptime formatting

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Information about the bot')
        .addSubcommand(subcommand => subcommand.setName('help').setDescription('Get help about the bot commands'))
        .addSubcommand(subcommand => subcommand.setName('info').setDescription('Get information about the bot'))
        .addSubcommand(subcommand => subcommand.setName('ping').setDescription('See the bot\'s ping'))
        .addSubcommand(subcommand => subcommand.setName('uptime').setDescription('Show how long the bot has been running'))
        .addSubcommand(subcommand => subcommand.setName('support').setDescription('Get the bot support server invite'))
        .addSubcommand(subcommand => subcommand.setName('vote').setDescription('See if you have voted')) // Dummy
        .addSubcommand(subcommand => subcommand.setName('feedback').setDescription('Send feedback to devs').addStringOption(opt => opt.setName('feedback').setDescription('Your feedback').setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('owner').setDescription('Info about the bot owner'))
        .addSubcommand(subcommand => subcommand.setName('socials').setDescription('Bot social media links'))
        .addSubcommand(subcommand => subcommand.setName('donate').setDescription('Bot donation link'))
        .addSubcommand(subcommand => subcommand.setName('links').setDescription('All important bot links'))
        .addSubcommand(subcommand => subcommand.setName('changelogs').setDescription('Bot changelog')),

    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const sub = interaction.options.getSubcommand();
        const user = interaction.user;

        if (sub === 'help') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("🤖 Bot Help")
                        .setDescription("Use `/bot <subcommand>` to get information.")
                        .addFields(
                            { name: "`info`", value: "Shows bot information" },
                            { name: "`ping`", value: "Shows bot latency" },
                            { name: "`uptime`", value: "How long bot has been online" },
                            { name: "`feedback`", value: "Send your opinion to devs" }
                        )
                        .setColor("Blue")
                ]
            });
        }

        if (sub === 'info') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("🤖 Bot Info")
                        .addFields(
                            { name: "Name", value: client.user.tag, inline: true },
                            { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
                            { name: "Users", value: `${client.users.cache.size}`, inline: true },
                            { name: "Created", value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:R>`, inline: true },
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor("Blurple")
                ]
            });
        }

        if (sub === 'ping') {
            const ping = client.ws.ping;
            return interaction.editReply(`🏓 Pong! Latency is **${ping}ms**.`);
        }

        if (sub === 'uptime') {
            const duration = moment.duration(client.uptime).humanize();
            return interaction.editReply(`⏱️ Uptime: **${duration}**`);
        }

        if (sub === 'support') {
            return interaction.editReply("Need help? Join our support server: https://discord.gg/your-support-link");
        }

        if (sub === 'vote') {
            return interaction.editReply("🗳️ You can vote for the bot here: https://top.gg/bot/yourbotid/vote");
        }

        if (sub === 'feedback') {
            const feedback = interaction.options.getString("feedback");
            // You can log this to a channel or database
            console.log(`Feedback from ${user.tag}: ${feedback}`);
            return interaction.editReply("✅ Thank you for your feedback!");
        }

        if (sub === 'owner') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("👑 Bot Owner")
                        .setDescription("This bot was developed by **Abel T. Manu** (aka appu bruh).")
                        .setColor("Gold")
                ]
            });
        }

        if (sub === 'socials') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("🌐 Bot Socials")
                        .addFields(
                            { name: "GitHub", value: "[Click Here](https://github.com/yourgithub)" },
                            { name: "Instagram", value: "[Click Here](https://instagram.com/yourhandle)" },
                            { name: "Twitter", value: "[Click Here](https://twitter.com/yourhandle)" }
                        )
                        .setColor("Green")
                ]
            });
        }

        if (sub === 'donate') {
            return interaction.editReply("❤️ Support the bot: https://your-donate-link.com");
        }

        if (sub === 'links') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("🔗 Bot Links")
                        .addFields(
                            { name: "Invite", value: "[Click Here](https://discord.com/api/oauth2/authorize?client_id=BOT_ID&permissions=8&scope=bot%20applications.commands)" },
                            { name: "Vote", value: "[Click Here](https://top.gg/bot/yourbotid/vote)" },
                            { name: "Support Server", value: "[Click Here](https://discord.gg/your-support-link)" }
                        )
                        .setColor("Purple")
                ]
            });
        }

        if (sub === 'changelogs') {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("📜 Bot Changelogs")
                        .setDescription("- Added music support\n- Improved latency\n- Fixed bugs in automod\n- UI commands refactored")
                        .setColor("Orange")
                ]
            });
        }
    }
};
 
