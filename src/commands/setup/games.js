const Discord = require('discord.js');

const Counting = require("../../database/models/countChannel");
const GTN = require("../../database/models/guessNumber");
const GTW = require("../../database/models/guessWord");
const WordSnake = require("../../database/models/wordsnake");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');
    const channel = interaction.options.getChannel('channel');

    if (choice == "counting") {
        client.embed({
            title: `🔢・Számolás`,
            desc: `Ez a számolás kezdete! Az első szám **1**`
        }, channel)

        client.createChannelSetup(Counting, channel, interaction)
    }

    if (choice == "gtn") {
        client.embed({
            title: `🔢・Találd ki a számot`,
            desc: `Találd ki a számot **1** és **10.000** között!`
        }, channel)

        client.createChannelSetup(GTN, channel, interaction)
    }

    if (choice == "gtw") {
        var word = "start";
        var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

        client.embed({
            title: `💬・Találd ki a szót`,
            desc: `Rakd a betűket a megfelelő sorrendbe!`,
            fields: [
                {
                    name: `🔀┆Szó`,
                    value: `${shuffled.toLowerCase()}`
                }
            ],
        }, channel)

        client.createChannelSetup(GTW, channel, interaction)
    }

    if (choice == "wordsnake") {
        client.createChannelSetup(WordSnake, channel, interaction)
    }
}

 