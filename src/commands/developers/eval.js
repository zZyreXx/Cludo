const Discord = require('discord.js');

const { inspect } = require('util');

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.evalLogs.id,
        token: client.webhooks.evalLogs.token,
    });

    let code = interaction.options.getString('code');
    if (code.includes('token') == true) return client.errNormal({ error: "I'm not going to send my token!", type: 'editreply' }, interaction);

    code = code.replace(/[""]/g, '"').replace(/['']/g, "'");
    let evaled;

    try {
        const start = process.hrtime();
        evaled = eval(code);

        if (evaled instanceof Promise) {
            evaled = await evaled;
        }

        const stop = process.hrtime(start);
        const outputResponse = `\`\`\`${inspect(evaled, { depth: 0 })}\n\`\`\``;

        if (outputResponse.length <= 1024) {
            await client.embed({
                title: `<:tvcfs:1208770529545166868>・Eval`,
                fields: [
                    {
                        name: "<:inputxx:1208771195051442186><:arrowright:1205414889451954196>Input",
                        value: `\`\`\`${code}\`\`\``,
                        inline: false,
                    },
                    {
                        name: "<:outoput:1208771745729871872><:arrowright:1205414889451954196>Output",
                        value: outputResponse.substr(0, 1024),
                        inline: false,
                    },
                ],
                type: 'editreply'
            }, interaction)

            const embed2 = new Discord.EmbedBuilder()
                .setTitle(`${interaction.user.tag} used eval command`)
                .addFields(
                    { name: "<:inputxx:1208771195051442186><:arrowright:1205414889451954196>Input", value: `\`\`\`${code}\`\`\``, inline: false },
                    { name: "<:outoput:1208771745729871872><:arrowright:1205414889451954196>Output", value: outputResponse.substr(0, 1024), inline: false },
                )
                .setColor(client.config.colors.normal)
                .setTimestamp();
            webhookClientLogs.send({
                username: 'Bot Logs',
                embeds: [embed2],
            });
        }
        else {
            const output = new Discord.AttachmentBuilder(Buffer.from(outputResponse), { name: 'output.txt' });
            var embed2 = new Discord.EmbedBuilder()
                .setAuthor(client.user.username, client.user.avatarURL())
                .addFields(
                    { name: "<:inputxx:1208771195051442186><:arrowright:1205414889451954196>Input", value: `\`\`\`${code}\`\`\``, inline: false },
                )
                .setColor(client.config.colors.succes)
                .setFooter(client.config.discord.footer)
                .setTimestamp();
            interaction.editreply({ embeds: [embed2] });
            await interaction.channel.send({ files: [output] });
        }
    }
    catch (err) {

        return client.embed({
            title: `<:tvcfs:1208770529545166868><:arrowright:1205414889451954196>Eval`,
            fields: [
                {
                    name: "<:inputxx:1208771195051442186><:arrowright:1205414889451954196>Input",
                    value: `\`\`\`${code}\`\`\``,
                    inline: false,
                },
                {
                    name: "<:croszx:1208738786662678548><:arrowright:1205414889451954196>Error!",
                    value: `\`\`\`${clean(err)}\`\`\``,
                    inline: false,
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}

const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

 
