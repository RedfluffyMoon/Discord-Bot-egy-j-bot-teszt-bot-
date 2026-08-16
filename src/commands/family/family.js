const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user') || interaction.user;

    const data = await Schema.findOne({ Guild: interaction.guild.id, User: target.id });

    client.embed({
        title: `👪・${target.username} családja`,
        thumbnail: target.avatarURL({ size: 1024 }),
        fields: [
            {
                name: `Pár`,
                value: `${data && data.Partner ? `<@!${data.Partner}>` : `Ez a felhasználó nincs megházasodva`}`
            },
            {
                name: `Szülő`,
                value: `${data && data.Parent.length > 0 ? `${data.Parent.join(", ")}` : `Ennek a felhasználónak nincsenek szülei`}`
            },
            {
                name: `Gyerekek`,
                value: `${data && data.Children.length > 0 ? `${data.Children.join(", ")}` : `Ennek a felhasználónak nincsenek gyerekei`}`
            }
        ],
        type: 'editreply'
    }, interaction)
}

 