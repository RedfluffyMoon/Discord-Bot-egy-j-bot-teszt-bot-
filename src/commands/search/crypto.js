const Discord = require('discord.js');
const axios = require('axios');

module.exports = async (client, interaction, args) => {

    let coin = interaction.options.getString('coin');
    let currency = interaction.options.getString('currency');

    try {
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
        );

        if (!data[coin][currency]) return;

        client.embed({
            title: `💹・Kripto statisztika`,
            desc: `A jelenlegi ár: **1 ${coin}** = **${data[coin][currency]} ${currency}**`,
            type: 'editreply'
        }, interaction);
    }
    catch {
        client.errNormal({
            error: "Kérlek ellenőrizd a megadott adatokat!",
            type: 'editreply'
        }, interaction);
    }
}

 