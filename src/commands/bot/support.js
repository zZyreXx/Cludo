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
        title: `<:__:1205407307811262466>・Support`,
        desc: `Make your server even better with Bot!`,
        image: "https://cdn.discordapp.com/attachments/1064478382504550400/1205446107279265812/CLUDO_1_2.png?ex=65d8662c&is=65c5f12c&hm=1dc3f94e83b96c83f3399ac2dafa88fa8c7a9479276a80371507b09e93e79950&",
        url: client.config.discord.serverInvite,
        components: [row],
        type: 'editreply'
    }, interaction)
}

 
