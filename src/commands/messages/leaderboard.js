const Discord = require('discord.js');

const Schema = require("../../database/models/messages");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id }).sort(([['Messages', 'descending']]));

    if (!rawLeaderboard) return client.errNormal({
        error: `Nem található adat!`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `**${rawLeaderboard.findIndex(i => i.Guild === interaction.guild.id && i.User === e.User) + 1}** | <@!${e.User}> - Üzenetek: \`${e.Messages}\``);

    await client.createLeaderboard(`💬・Üzenetek - ${interaction.guild.name}`, lb, interaction);
}

 