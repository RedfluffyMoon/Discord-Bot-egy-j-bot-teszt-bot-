const Discord = require('discord.js');

const Schema = require("../../database/models/messageRewards");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id });

    if (rawLeaderboard.length < 1) return client.errNormal({
        error: `Nem található jutalom!`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `**${e.Messages} üzenet** - <@&${e.Role}>`);

    await client.createLeaderboard(`💬・Üzenet jutalmak - ${interaction.guild.name}`, lb, interaction);
}

 