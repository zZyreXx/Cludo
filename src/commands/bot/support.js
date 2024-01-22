const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Support server")
                .setURL(client.config.discord.serverInvite)
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `<:helpzz:1072010469142974504>・Support`,
        desc: `Make your server even better with Bot!`,
        image: "https://cdn.discordapp.com/attachments/1064478382504550400/1072035974781091960/CLUDO-removebg-preview.png",
        url: client.config.discord.serverInvite,
        components: [row],
        type: 'editreply'
    }, interaction)
}

 
