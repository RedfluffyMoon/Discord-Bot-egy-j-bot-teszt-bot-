const Discord = require('discord.js');

const Schema = require("../../database/models/suggestionChannels");

module.exports = async (client, interaction, args) => {
    const suggestionQuery = interaction.options.getString('suggestion');

    const data = await Schema.findOne({ Guild: interaction.guild.id });
    if (data) {
        const channel = interaction.guild.channels.cache.get(data.Channel);

        client.embed({
            title: `💡・Javaslat`,
            desc: `${suggestionQuery}`,
            author: {
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
            }
        }, channel).then((msg) => {
            client.succNormal({
                text: `A javaslat sikeresen elküldve!`,
                fields: [
                    {
                        name: `💬┇Javaslat`,
                        value: `${suggestionQuery}`,
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

            msg.react(client.emotes.normal.arrowUp);
            msg.react(client.emotes.normal.arrowDown);
        }).catch((e) => {
            return client.errNormal({
                error: `Nincs beállítva javaslat csatorna! Kérlek végezd el a beállítást`,
                type: 'editreply'
            }, interaction)
        })
    }
    else {
        client.errNormal({
            error: `Nincs beállítva javaslat csatorna! Kérlek végezd el a beállítást`,
            type: 'editreply'
        }, interaction);
    }
}

 