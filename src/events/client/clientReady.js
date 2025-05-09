const Discord = require('discord.js');
const chalk = require('chalk');
const { random } = require('mathjs');

module.exports = async (client) => {
  const startLogs = new Discord.WebhookClient({
    id: client.webhooks.startLogs.id,
    token: client.webhooks.startLogs.token,
  });

  console.log(`\u001b[0m`);
  console.log(chalk.blue(chalk.bold(`Bot`)), (chalk.white(`>>`)), chalk.green(`Started on`), chalk.red(`${client.guilds.cache.size}`), chalk.green(`servers!`))

  let embed = new Discord.EmbedBuilder()
    .setTitle(`<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Finishing Bot`)
    .setDescription(`A bot just became ready`)
    .setColor(client.config.colors.normal)
  startLogs.send({
    username: '.Cludo',
    embeds: [embed],
  });

  setInterval(async function() {
    const totalGuilds = client.guilds.cache.size
    let statuttext;
    if (process.env.DISCORD_STATUS) {
      statuttext = process.env.DISCORD_STATUS.split(', ');
    } else {
      statuttext = [
        `/help`,
        `${totalGuilds} servers`,
        `cludo.js`,
        `tiny.cc/Cludo`,
        `Version ${require(`${process.cwd()}/package.json`).version}`
      ];
    }
    const randomText = statuttext[Math.floor(Math.random() * statuttext.length)];
    client.user.setPresence({ activities: [{ name: randomText, type: Discord.ActivityType.Playing }], status: 'online' });
  }, 50000)

  client.player.init(client.user.id);
}
