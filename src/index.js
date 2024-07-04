const express = require("express");
const app = express();
const axios = require('axios');
const chalk = require('chalk');
const { version } = require('../package.json');
require('dotenv').config();
const Discord = require('discord.js');
const https = require('https');

const webhook = require("./config/webhooks.json");
const config = require("./config/bot");

// Express server setup
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});
app.use('/dashboard', express.static('dashboard'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Check if bot is up to date
axios.get('https://api.github.com/repos/zZyreXx/Cludo/releases/latest')
  .then(res => {
    if (res.data.tag_name !== version) {
      console.log(chalk.red.bgYellow(`Your bot is not up to date! Please update to the latest version!`, version + ' -> ' + res.data.tag_name));
    }
  })
  .catch(err => {
    console.log(chalk.red.bgYellow(`Failed to check if bot is up to date!`));
  });

// Lambda function handler
exports.handler = async (event, context) => {
  const url = 'https://cludo.onrender.com/';

  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode === 200) {
        resolve({
          statusCode: 200,
          body: 'Server pinged successfully',
        });
      } else {
        reject(new Error(`Server ping failed with status code: ${res.statusCode}`));
      }
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];

// Check if .env webhook_id and webhook_token are set
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
  for (const webhookName of webHooksArray) {
    webhook[webhookName].id = process.env.WEBHOOK_ID;
    webhook[webhookName].token = process.env.WEBHOOK_TOKEN;
  }
}

const startLogs = new Discord.WebhookClient({
  id: webhook.startLogs.id,
  token: webhook.startLogs.token,
});

const shardLogs = new Discord.WebhookClient({
  id: webhook.shardLogs.id,
  token: webhook.shardLogs.token,
});

const manager = new Discord.ShardingManager('./src/bot.js', {
  totalShards: 'auto',
  token: process.env.DISCORD_TOKEN,
  respawn: true
});

if (process.env.TOPGG_TOKEN) {
  const { AutoPoster } = require('topgg-autoposter');
  AutoPoster(process.env.TOPGG_TOKEN, manager);
}

console.clear();
console.log(chalk.blue(chalk.bold(`System`)), chalk.white(`>>`), chalk.green(`Starting up`), chalk.white(`...`));
console.log(`\u001b[0m`);
console.log(chalk.red(`© TEDXDevs | 2020 - ${new Date().getFullYear()}`));
console.log(chalk.red(`All rights reserved`));
console.log(`\u001b[0m`);
console.log(`\u001b[0m`);
console.log(chalk.blue(chalk.bold(`System`)), chalk.white(`>>`), chalk.red(`Version ${require(`${process.cwd()}/package.json`).version}`), chalk.green(`loaded`));
console.log(`\u001b[0m`);

manager.on('shardCreate', shard => {
  let embed = new Discord.EmbedBuilder()
    .setTitle(`<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>Launching shard`)
    .setDescription(`A shard has just been launched`)
    .setFields([
      {
        name: "<:guildxx:1205555662008881182><:arrowright:1205414889451954196>ID",
        value: `${shard.id + 1}/${manager.totalShards}`,
        inline: true
      },
      {
        name: `<:uptimex:1205871485424631828><:arrowright:1205414889451954196>State`,
        value: `Starting up...`,
        inline: true
      }
    ])
    .setColor(config.colors.normal);
  
  startLogs.send({
    username: 'Cludo Logs',
    embeds: [embed],
  });

  console.log(chalk.blue(chalk.bold(`System`)), chalk.white(`>>`), chalk.green(`Starting`), chalk.red(`Shard #${shard.id + 1}`), chalk.white(`...`));
  console.log(`\u001b[0m`);

  shard.on("death", process => {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Closing shard ${shard.id + 1}/${manager.totalShards} unexpectedly`)
      .setFields([
        {
          name: "<:cludoxc:1205719737766776872><:arrowright:1205414889451954196>ID",
          value: `${shard.id + 1}/${manager.totalShards}`,
        },
      ])
      .setColor(config.colors.normal);
    
    shardLogs.send({
      username: 'Cludo Logs',
      embeds: [embed]
    });

    if (process.exitCode === null) {
      const embed = new Discord.EmbedBuilder()
        .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Shard ${shard.id + 1}/${manager.totalShards} exited with NULL error code!`)
        .setFields([
          {
            name: "PID",
            value: `\`${process.pid}\``,
          },
          {
            name: "Exit code",
            value: `\`${process.exitCode}\``,
          }
        ])
        .setColor(config.colors.normal);
      
      shardLogs.send({
        username: 'Cludo Logs',
        embeds: [embed]
      });
    }
  });

  shard.on("shardDisconnect", event => {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Shard ${shard.id + 1}/${manager.totalShards} disconnected`)
      .setDescription("Dumping socket close event...")
      .setColor(config.colors.normal);
    
    shardLogs.send({
      username: 'Cludo Logs',
      embeds: [embed],
    });
  });

  shard.on("shardReconnecting", () => {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Reconnecting shard ${shard.id + 1}/${manager.totalShards}`)
      .setColor(config.colors.normal);
    
    shardLogs.send({
      username: 'Cludo Logs',
      embeds: [embed],
    });
  });
});

manager.spawn();

// Webhooks
const consoleLogs = new Discord.WebhookClient({
  id: webhook.consoleLogs.id,
  token: webhook.consoleLogs.token,
});

const warnLogs = new Discord.WebhookClient({
  id: webhook.warnLogs.id,
  token: webhook.warnLogs.token,
});

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
  if (error.length > 950) error = error.slice(0, 950) + '... view console for details';
  if (error.stack && error.stack.length > 950) error.stack = error.stack.slice(0, 950) + '... view console for details';

  const embed = new Discord.EmbedBuilder()
    .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>Unhandled promise rejection`)
    .addFields([
      {
        name: "Error",
        value: error ? Discord.codeBlock(error) : "No error",
      },
      {
        name: "Stack error",
        value: error.stack ? Discord.codeBlock(error.stack) : "No stack error",
      }
    ]);
  
  consoleLogs.send({
    username: 'Cludo Logs',
    embeds: [embed],
  }).catch(() => {
    console.log('Error sending unhandled promise rejection to webhook');
    console.log(error);
  });
});

process.on('warning', warn => {
  console.warn("Warning:", warn);
  const embed = new Discord.EmbedBuilder()
    .setTitle(`<:status:1205426484223938580><:arrowright:1205414889451954196>New warning found`)
    .addFields([
      {
        name: `Warn`,
        value: `\`\`\`${warn}\`\`\``,
      },
    ]);
  
  warnLogs.send({
    username: 'Cludo Logs',
    embeds: [embed],
  }).catch(() => {
    console.log('Error sending warning to webhook');
    console.log(warn);
  });
});
