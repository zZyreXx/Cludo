const Discord = require('discord.js');
const Topgg = require(`@top-gg/sdk`);
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    let dbl = new Topgg.Api(process.env.TOPGG_TOKEN)

    let row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel("Vote for me")
                .setURL("https://top.gg/bot/798144456528363550/vote")
                .setStyle('LINK'),
        );

    try {
        const voted = await dbl.hasVoted(interaction.user.id);
        
        let embed = new Discord.MessageEmbed()
            .setTitle(`📨・Vote`)
            .setImage(`https://cdn.discordapp.com/attachments/843487478881976381/874694192755007509/Bot_banner_vote.jpg`)
            .setColor(voted ? client.config.colors.success : client.config.colors.error)
            .setDescription(voted ? "You have voted!" : "You have not voted!")
            .setTimestamp();

        await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
        console.error("Error occurred while checking vote:", error);
        await interaction.reply({ content: "There was an error by checking this vote!", ephemeral: true });
    }
}

