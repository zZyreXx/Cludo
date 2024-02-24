const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType } = require('discord.js');
const puppeteer = require('puppeteer');

module.export = {
    data: new ContextMenuCommandBuilder()
    .setName("AI Response")
    .setType(ApplicationCommandType.Message),
    async execute (interaction) {

        await interaction.deferReply({ emphemeral: true });
        var message = await interaction.channel.message.fetch(interaction.targetId);

        if (message.content.length <=0) return await interaction.editReply({ content: '⚠️ You Must have message content to have AI to be used'});

        async function getResponse() {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            await page.goto('https://chat-app-f2d296.zapier.app/');

            const texBoxSelector = 'textarea[area-label="chatbot-user-prompt"}';
            await page.waitForSelector(textBoxSelector);

            await page.type(texBoxSelector, message.content);
            await page.keyboard.press("Enter");

            await page.waitForSelector('[data-testid="final-bot-response"] p').catch(err => {
                return;
            });

            value = await page.$$eval('[data-testid="final-bot-response"]', async (elements) => {

            });

            await browser.close();

            value.shift();
            return value.join('\n\n\n\n');
        }

        const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`🌍 **Here is the AI Response for the message:** \`${message.content}\` \n\n`\`\`${await getResponse()}\`\`\``);

        await interaction.editReply({ embeds: [embed] });
        
    }
}
