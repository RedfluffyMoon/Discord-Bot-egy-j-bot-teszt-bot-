const Discord = require('discord.js');

const Schema = require("../../database/models/stickymessages");

module.exports = async (client, interaction, args) => {
    const data = await Schema.find({ Guild: interaction.guild.id });

    if (data) {
        let list = ``;

        for (var i = 0; i < data.length; i++) {
            list += `**${i + 1}** - Csatorna: ${data[i].Channel}`;
        }

        await client.embed({
            title: `💬・Tapadós üzenetek`,
            desc: list,
            type: 'editreply'
        }, interaction)
    }
    else {
        client.errNormal({
            error: "Nincs adat!",
            type: 'editreply'
        }, interaction)
    }
}

 