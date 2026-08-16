const Discord = require('discord.js');

const Schema = require("../../database/models/blacklist");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data && data.Words.length > 0) {
            client.embed({
                title: "🤬・Feketelistás szavak",
                desc: data.Words.join(", "),
                type: 'editreply'
            }, interaction)
        }
        else {
            client.errNormal({
                error: `Ehhez a szerverhez nincs adat!`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 