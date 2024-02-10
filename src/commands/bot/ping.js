const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = async (client, interaction, args) => {
    client.simpleEmbed({
        desc: `${client.emotes.animated.loading} Calculating ping...`,
        type: 'editreply'
    }, interaction).then((resultMessage) => {
        const ping = Math.floor(resultMessage.createdTimestamp - interaction.createdTimestamp);

        mongoose.connection.db.admin().ping(function (err, result) {

            var mongooseSeconds = ((result.ok % 60000) / 1000);
            var pingSeconds = ((ping % 60000) / 1000);
            var apiSeconds = ((client.ws.ping % 60000) / 1000);

            client.embed({
                title: `<:afk:1205539497979289620><:arrowright:1205414889451954196>Pong`,
                desc: `Check out how fast our bot is`,
                fields: [
                    {
                        name: "<:automod:1205540532206575666><:arrowright:1205414889451954196>Bot latency",
                        value: `${ping}ms (${pingSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "<:settings:1205543029817999390><:arrowright:1205414889451954196>API Latency",
                        value: `${client.ws.ping}ms (${apiSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Database Latency",
                        value: `${result.ok}ms (${mongooseSeconds}s)`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction)
        })
    })
}

 

 
