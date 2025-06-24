const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const wallets = new Map(); // Replace with real DB like Mongo if you want persistence

function getBalance(userId) {
    if (!wallets.has(userId)) wallets.set(userId, 1000); // Starting balance
    return wallets.get(userId);
}

function updateBalance(userId, amount) {
    let bal = getBalance(userId);
    wallets.set(userId, bal + amount);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('casino')
        .setDescription('Play the casino game')
        .addSubcommand(sub =>
            sub.setName('help').setDescription('Get information about the casino commands'))
        .addSubcommand(sub =>
            sub.setName('blackjack').setDescription('Play a blackjack game')
                .addNumberOption(opt => opt.setName('amount').setDescription('Enter an amount').setRequired(true)))
        .addSubcommand(sub =>
            sub.setName('crash').setDescription('More risk, more reward')
                .addNumberOption(opt => opt.setName('amount').setDescription('Enter an amount').setRequired(true)))
        .addSubcommand(sub =>
            sub.setName('roulette').setDescription('Play roulette')
                .addStringOption(opt => opt.setName('color').setDescription('Red or Black').setRequired(true))
                .addNumberOption(opt => opt.setName('amount').setDescription('Enter an amount').setRequired(true)))
        .addSubcommand(sub =>
            sub.setName('slots').setDescription('Play slots')
                .addNumberOption(opt => opt.setName('amount').setDescription('Enter an amount').setRequired(true))),

    run: async (client, interaction) => {
        await interaction.deferReply();
        const userId = interaction.user.id;
        const sub = interaction.options.getSubcommand();

        if (sub === 'help') {
            const embed = new EmbedBuilder()
                .setTitle("🎰 Casino Help")
                .setDescription("Available Games:")
                .addFields(
                    { name: "/casino blackjack", value: "Play blackjack" },
                    { name: "/casino crash", value: "High risk betting" },
                    { name: "/casino roulette", value: "Bet on Red or Black" },
                    { name: "/casino slots", value: "Classic slot machine" }
                )
                .setColor("Gold");
            return interaction.editReply({ embeds: [embed] });
        }

        const amount = interaction.options.getNumber('amount');
        let bal = getBalance(userId);

        if (amount <= 0) return interaction.editReply("❌ Amount must be greater than 0.");
        if (amount > bal) return interaction.editReply("❌ You don't have enough balance.");

        if (sub === 'blackjack') {
            const result = Math.random() < 0.5 ? 'lose' : 'win';
            const winAmount = Math.floor(amount * 1.5);
            updateBalance(userId, result === 'win' ? winAmount : -amount);

            return interaction.editReply(`${result === 'win' ? '🎉 You won' : '💀 You lost'} ${result === 'win' ? winAmount : amount} coins! Your new balance: ${getBalance(userId)}.`);
        }

        if (sub === 'crash') {
            const multiplier = (Math.random() * 5).toFixed(2);
            const crashed = Math.random() < 0.4;
            if (crashed) {
                updateBalance(userId, -amount);
                return interaction.editReply(`💥 You crashed at ${multiplier}x and lost ${amount} coins. Balance: ${getBalance(userId)}`);
            } else {
                const winnings = Math.floor(amount * multiplier);
                updateBalance(userId, winnings);
                return interaction.editReply(`🚀 You cashed out at ${multiplier}x and won ${winnings} coins! Balance: ${getBalance(userId)}`);
            }
        }

        if (sub === 'roulette') {
            const color = interaction.options.getString('color').toLowerCase();
            if (!['red', 'black'].includes(color)) return interaction.editReply("🎲 Choose either `red` or `black`.");

            const winColor = Math.random() < 0.5 ? 'red' : 'black';
            if (color === winColor) {
                updateBalance(userId, amount);
                return interaction.editReply(`🟥 The ball landed on **${winColor}**! You won ${amount} coins. Balance: ${getBalance(userId)}`);
            } else {
                updateBalance(userId, -amount);
                return interaction.editReply(`⬛ The ball landed on **${winColor}**. You lost ${amount} coins. Balance: ${getBalance(userId)}`);
            }
        }

        if (sub === 'slots') {
            const symbols = ['🍒', '🍋', '🍉', '⭐', '💎'];
            const slot = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
            const win = slot.every(s => s === slot[0]);
            const winAmount = win ? amount * 5 : -amount;
            updateBalance(userId, winAmount);

            return interaction.editReply(`🎰 ${slot.join(' | ')}\n${win ? `🎉 Jackpot! You won ${amount * 5}` : `😢 You lost ${amount}`} coins. Balance: ${getBalance(userId)}`);
        }
    }
};
 
