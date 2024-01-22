const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    const ip = interaction.options.getString('ip');

    if (ip == null) return client.errUsage({ usage: "mcstatus [ip]", type: 'editreply' }, interaction)

    fetch(`https://api.mcsrvstat.us/2/${ip}`)
        .then((res) => res.json()).catch({})
        .then(async (json) => {

            if (!json.players) return client.errNormal({ error: "Can't find the server!", type: 'editreply' }, interaction)

            return client.embed({
                title: `<:folderr:1071798946688680027>・${ip}`,
                thumbnail: `https://eu.mc-api.net/v3/server/favicon/${ip}`,
                fields: [{
                    name: "🟢┇Online",
                    value: `${json.online}`,
                    inline: true,
                },
                {
                    name: "<:x_:1071781614423642193> ┇Version",
                    value: `${json.version}`,
                    inline: true,
                },
                {
                    name: "<:memberzz:1071796953580572744>┇Players online",
                    value: `${json.players.online}/${json.players.max}`,
                    inline: true,
                },
                ], type: 'editreply'
            }, interaction)
        }).catch({})
}

 
 
