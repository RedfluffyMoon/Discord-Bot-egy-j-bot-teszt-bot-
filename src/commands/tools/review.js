const Discord = require('discord.js');

const Schema = require("../../database/models/reviewChannels");

module.exports = async (client, interaction, args) => {
    const stars = interaction.options.getNumber('stars');
    const message = interaction.options.getString('message') || 'Nincs megadva';

    if (stars < 1 || stars > 5) return client.errNormal({
        error: `A csillagok száma legalább 1, legfeljebb 5 lehet`,
        type: 'editreply'
    }, interaction)

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            const channel = interaction.member.guild.channels.cache.get(data.Channel);
            if (!channel) return  client.errNormal({
                error: `Nincs beállítva értékelési csatorna! Használd a \`reviewchannel\` parancsot`,
                type: 'editreply'
            }, interaction);

            let totalStars = "";
            for (let i = 0; i < stars; i++) {
                totalStars += ":star:";
            }

            client.succNormal({
                text: "Az értékelésed sikeresen elküldve",
                fields: [
                    {
                        name: `⭐┇Csillagok`,
                        value: `${stars}`,
                        inline: true
                    },
                    {
                        name: `📘┇Csatorna`,
                        value: `<#${data.Channel}>`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);

            client.embed({
                title: `Értékelés・${interaction.user.tag}`,
                desc: `Egy új értékelés érkezett!`,
                fields: [
                    {
                        name: "Csillagok",
                        value: `${totalStars}`,
                        inline: true,
                    },
                    {
                        name: "Megjegyzés",
                        value: `${message}`,
                        inline: true,
                    },
                ]
            }, channel)

        }
        else {
            client.errNormal({
                error: `Nincs beállítva értékelési csatorna! Használd a \`reviewchannel\` parancsot`,
                type: 'editreply'
            }, interaction)
        }
    })
}

 