const Discord = require('discord.js');

const Schema = require("../../database/models/messages");

module.exports = async (client, interaction, args) => {
    let user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            client.embed({
                title: "💬・Üzenetek",
                desc: `**${user.tag}** felhasználónak \`${data.Messages}\` üzenete van`,
                type: 'editreply'
            }, interaction)
        }
        else {
            client.embed({
                title: "💬・Üzenetek",
                desc: `**${user.tag}** felhasználónak \`0\` üzenete van`,
                type: 'editreply'
            }, interaction)
        }
    });
}

 