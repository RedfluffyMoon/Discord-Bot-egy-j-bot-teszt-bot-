const Discord = require('discord.js');

const Schema = require("../../database/models/invites");

module.exports = async (client, interaction, args) => {
    let user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            client.embed({
                title: "📨・Meghívók",
                desc: `**${user.tag}** felhasználónak \`${data.Invites}\` meghívója van`,
                fields: [
                    {
                        name: "Összesen",
                        value: `${data.Total}`,
                        inline: true
                    },
                    {
                        name: "Elveszett",
                        value: `${data.Left}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        }
        else {
            client.embed({
                title: "📨・Meghívók",
                desc: `**${user.tag}** felhasználónak \`0\` meghívója van`,
                fields: [
                    {
                        name: "Összesen",
                        value: `0`,
                        inline: true
                    },
                    {
                        name: "Elveszett",
                        value: `0`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        }
    });
}

 