const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (!data) return client.errNormal({
            error: "Nincs beállítva születésnap!",
            type: 'editreply'
        }, interaction);

        Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.user.id }).then(() => {
            client.succNormal({
                text: "A születésnapod törölve",
                type: 'editreply'
            }, interaction)
        })
    })
}

 