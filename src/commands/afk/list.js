const Discord = require('discord.js');

const Schema = require('../../database/models/afk');

module.exports = async (client, interaction, args) => {
    const rawboard = await Schema.find({ Guild: interaction.guild.id })

    if (rawboard.length < 1) return client.errNormal({
        error: "Nincs adat!",
        type: 'editreply'
    }, interaction);

    const lb = rawboard.map(e => `<@!${e.User}> - **Indok** ${e.Message}`);

    await client.createLeaderboard(`🚫・AFK felhasználók - ${interaction.guild.name}`, lb, interaction);
}

 