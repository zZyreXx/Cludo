const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");
    const upvalue = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

    client.embed({
        title: `<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Uptime`,
        desc: `See the uptime of Bot`,
        fields: [
            {
                name: "<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Uptime",
                value: `${duration}`,
                inline: true
            },
            {
                name: "<:status:1205426484223938580><:arrowright:1205414889451954196>Up Since",
                value: `<t:${upvalue}>`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)
}

 
