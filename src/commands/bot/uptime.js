const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");
    const upvalue = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

    client.embed({
        title: `<:upzzz:1071797858531016704>・Uptime`,
        desc: `See the uptime of Bot`,
        fields: [
            {
                name: "<:upzzz:1071797858531016704>┇Uptime",
                value: `${duration}`,
                inline: true
            },
            {
                name: "<:clockzz:1071798302741373008>┇Up Since",
                value: `<t:${upvalue}>`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)
}

 
