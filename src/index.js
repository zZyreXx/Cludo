const express = require("express");
const app = express();
const path = require("path");
const https = require('https');

require("dotenv").config();
const { WebhookClient, EmbedBuilder, codeBlock, ShardingManager } = require('discord.js');
const chalk = require('chalk');
const axios = require('axios');
const config = require("./config/bot.js");
const webhook = require("./config/webhooks.json");

// === EXPRESS STATIC ROUTING ===
app.get('/', (req, res) => res.redirect('/dashboard'));
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard')));
app.listen(3000);

// === VERSION CHECK ===
const { version } = require('../package.json');
axios.get('https://api.github.com/repos/zZyreXx/Cludo/releases/latest').then(response => {
  if (response.data.tag_name !== version) {
    console.log(chalk.red.bgYellow(`Your bot is not up to date!`), version + ' -> ' + response.data.tag_name);
  }
}).catch(() => {
  console.log(chalk.red.bgYellow(`Failed to check for updates.`));
});

// === KEEP-ALIVE FUNCTION (for render.com or similar) ===
exports.handler = async () => {
  const url = 'https://cludo.onrender.com/';
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve({ statusCode: 200, body: 'Server pinged successfully' });
      } else {
        reject(new Error(`Ping failed with status code: ${res.statusCode}`));
      }
    }).on('error', reject).end();
  });
};

// === FILL IN ENV VARS IF PROVIDED ===
const webhookKeys = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
  webhookKeys.forEach(key => {
    webhook[key].id = process.env.WEBHOOK_ID;
    webhook[key].token = process.env.WEBHOOK_TOKEN;
  });
}

// === WEBHOOK CLIENTS ===
const startLogs = WebhookClient.from({ id: webhook.startLogs.id, token: webhook.startLogs.token });
const shardLogs = WebhookClient.from({ id: webhook.shardLogs.id, token: webhook.shardLogs.token });
const consoleLogs = WebhookClient.from({ id: webhook.consoleLogs.id, token: webhook.consoleLogs.token });
const warnLogs = WebhookClient.from({ id: webhook.warnLogs.id, token: webhook.warnLogs.token });

// === SHARDING SETUP ===
const manager = new ShardingManager('./src/bot.js', {
  totalShards: 'auto',
  token: process.env.DISCORD_TOKEN,
  respawn: true
});

if (process.env.TOPGG_TOKEN) {
  const { AutoPoster } = require('topgg-autoposter');
  AutoPoster(process.env.TOPGG_TOKEN, manager);
}

// === CONSOLE LOGGING ===
console.clear();
console.log(chalk.blue.bold('System'), chalk.white('>>'), chalk.green('Starting up...'));
console.log(chalk.red(`© TEDXDevs | 2020 - ${new Date().getFullYear()} | All rights reserved`));
console.log(chalk.blue.bold('System'), chalk.white('>>'), chalk.red(`Version ${version}`), chalk.green('loaded'));

// === SHARD EVENTS ===
manager.on('shardCreate', shard => {
  const embed = new EmbedBuilder()
    .setTitle(`<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Launching shard`)
    .setDescription(`A shard has just been launched`)
    .setFields([
      { name: "<:guildxx:1205555662008881182><:arrowright:1205414889451954196>ID", value: `${shard.id + 1}/${manager.totalShards}`, inline: true },
      { name: `<:uptimex:1205871485424631828><:arrowright:1205414889451954196>State`, value: `Starting up...`, inline: true }
    ])
    .setColor(config.colors.normal);

  startLogs.send({ username: 'Cludo Logs', embeds: [embed] });

  console.log(chalk.blue.bold('System'), chalk.white('>>'), chalk.green(`Starting Shard #${shard.id + 1}`));

  shard.on("death", proc => {
    const embed = new EmbedBuilder()
      .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Shard ${shard.id + 1}/${manager.totalShards} exited unexpectedly`)
      .addFields({ name: "PID", value: `\`${proc.pid}\`` }, { name: "Exit code", value: `\`${proc.exitCode}\`` })
      .setColor(config.colors.normal);
    shardLogs.send({ username: 'Cludo Logs', embeds: [embed] });
  });

  shard.on("shardDisconnect", () => {
    const embed = new EmbedBuilder()
      .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Shard ${shard.id + 1} disconnected`)
      .setDescription("Dumping socket close event...")
      .setColor(config.colors.normal);
    shardLogs.send({ username: 'Cludo Logs', embeds: [embed] });
  });

  shard.on("shardReconnecting", () => {
    const embed = new EmbedBuilder()
      .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Reconnecting shard ${shard.id + 1}`)
      .setColor(config.colors.normal);
    shardLogs.send({ username: 'Cludo Logs', embeds: [embed] });
  });
});

manager.spawn();

// === GLOBAL ERROR HANDLERS ===
process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error);
  const embed = new EmbedBuilder()
    .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Unhandled promise rejection`)
    .addFields(
      { name: "Error", value: codeBlock(error.message || String(error)) },
      { name: "Stack", value: codeBlock(error.stack || "No stack trace") }
    );
  consoleLogs.send({ username: 'Cludo Logs', embeds: [embed] }).catch(() => console.error("Webhook failed."));
});

process.on('warning', warn => {
  console.warn("Warning:", warn);
  const embed = new EmbedBuilder()
    .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>New warning`)
    .addFields({ name: `Warn`, value: codeBlock(String(warn)) });
  warnLogs.send({ username: 'Cludo Logs', embeds: [embed] }).catch(() => console.error("Webhook failed."));
});
