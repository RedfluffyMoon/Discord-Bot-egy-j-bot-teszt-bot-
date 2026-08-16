const Discord = require('discord.js');

const Schema = require("../../database/models/blacklist");

module.exports = async (client, interaction, args) => {
    const word = interaction.options.getString('word');

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            if (!data.Words.includes(word)) {
                return client.errNormal({
                    error: `Ez a szó nem szerepel az adatbázisban!`,
                    type: 'editreply'
                }, interaction);
            }

            const filtered = data.Words.filter((target) => target !== word);

            await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, {
                Guild: interaction.guild.id,
                Words: filtered
            });

            client.succNormal({
                text: `A szó eltávolítva a feketelistáról!`,
                fields: [
                    {
                        name: `💬┆Szó`,
                        value: `${word}`
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Ehhez a szerverhez nincs adat!`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 