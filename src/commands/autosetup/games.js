const Discord = require('discord.js');

const Counting = require("../../database/models/countChannel");
const GTN = require("../../database/models/guessNumber");
const GTW = require("../../database/models/guessWord");
const WordSnake = require("../../database/models/wordsnake");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');

    if (choice == "counting") {
        interaction.guild.channels.create({
            name: "counting",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.embed({
                title: `<:noepds:1205561401909710899><:arrowright:1205414889451954196>Counting`,
                desc: `This is the start of counting! The first number is **1**`
            }, ch)

            client.createChannelSetup(Counting, ch, interaction)
        })
    }

    if (choice == "gtn") {
        interaction.guild.channels.create({
            name:"guess-the-number",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.embed({
                title: `<:noepds:1205561401909710899><:arrowright:1205414889451954196>Guess the number`,
                desc: `Guess the number between **1** and **10.000**!`
            }, ch)

            client.createChannelSetup(GTN, ch, interaction)
        })
    }

    if (choice == "gtw") {
        interaction.guild.channels.create({
            name: "guess-the-word",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            var word = "start";
            var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

            client.embed({
                title: `<:messagexc:1205567224362958868><:arrowright:1205414889451954196>Guess the word`,
                desc: `Put the letters in the right position!`,
                fields: [
                    {
                        name: `<:__:1205407307811262466><:arrowright:1205414889451954196>Word`,
                        value: `${shuffled.toLowerCase()}`
                    }
                ],
            }, ch)

            client.createChannelSetup(GTW, ch, interaction)
        })
    }

    if (choice == "wordsnake") {
        interaction.guild.channels.create({
            name: "word-snake",
            type: Discord.ChannelType.GuildText
        }).then((ch) => {
            client.createChannelSetup(WordSnake, ch, interaction)
        })
    }
}
