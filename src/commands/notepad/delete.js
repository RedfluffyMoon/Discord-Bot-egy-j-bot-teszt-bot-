const Discord = require('discord.js');
const generator = require('generate-password');

const Schema = require("../../database/models/notes");

module.exports = async (client, interaction, args) => {

    let id = interaction.options.getString('id');

    Schema.findOne({ Guild: interaction.guild.id, Code: id }, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, Code: id }).then(() => {
                client.succNormal({ text: `A(z) **#${id}** jegyzet törölve!`, type: 'editreply' }, interaction);
            })
        }
        else {
            client.errNormal({ error: `Nem található jegyzet a **#${id}** azonosítóval`, type: 'editreply' }, interaction);
        }
    })
}

 