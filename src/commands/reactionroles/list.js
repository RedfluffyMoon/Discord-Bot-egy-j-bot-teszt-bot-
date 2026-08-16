const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const reactions = await Schema.find({ Guild: interaction.guild.id });
    if (!reactions) return client.errNormal({
        error: `Nem található adat!`,
        type: 'editreply'
    }, interaction);

    let list = ``;

    for (var i = 0; i < reactions.length; i++) {
        list += `**${i + 1}** - Kategória: ${reactions[i].Category} \n`;
    }

    await client.embed({
        title: "📃・Reakció szerepkörök",
        desc: list,
        type: 'editreply'
    }, interaction)
}

 