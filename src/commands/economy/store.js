const Discord = require('discord.js');

const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args, message) => {
    store.find({ Guild: interaction.guild.id }, async (err, storeData) => {
        if (storeData && storeData.length > 0) {
            const lb = storeData.map(e => `**<@&${e.Role}>** - ${client.emotes.economy.coins} $${e.Amount} \n**Vásárlás:** \`buy ${e.Role}\``);

            await client.createLeaderboard(`🛒・${interaction.guild.name} boltja`, lb, interaction);
            client.embed({
                title: `🛒・A bot boltja`,
                desc: `**Horgászbot** - ${client.emotes.economy.coins} $100 \n**Vásárlás:** \`buy fishingrod\``,
            }, interaction.channel);
        }
        else {
            client.errNormal({
                error: `Nem található bolt ezen a szerveren!`,
                type: 'editreply' 
            }, interaction);
        }
    })

}

 