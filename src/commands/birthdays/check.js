const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (!data) return client.errNormal({
            error: "Nincs beállítva születésnap!",
            type: 'editreply'
        }, interaction);

        client.embed({
            title: `${client.emotes.normal.birthday}・Születésnap ellenőrzése`,
            desc: `${interaction.user.username} születésnapja: ${data.Birthday}`,
            type: 'editreply'
        }, interaction)
    })
}

 