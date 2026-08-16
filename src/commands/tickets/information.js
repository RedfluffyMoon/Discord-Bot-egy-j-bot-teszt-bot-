const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id }, async (err, ticketData) => {
        if (ticketData) {
            ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                if (data) {
                    const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                    if (ticketCategory == undefined) {
                        return client.errNormal({
                            error: "Végezd el a beállítást!",
                            type: 'editreply'
                        }, interaction);
                    }

                    if (interaction.channel.parentId == ticketCategory.id) {

                        client.embed({
                            desc: `${client.emotes.animated.loading}・Információk betöltése...`,
                            type: 'editreply'
                        }, interaction).then((msg) => {

                            client.transcript(interaction, interaction.channel);

                            return client.embed({
                                title: `ℹ・Információ`,
                                fields: [
                                    {
                                        name: "Ticket neve",
                                        value: `\`${interaction.channel.name}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Csatorna azonosító",
                                        value: `\`${interaction.channel.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Létrehozta",
                                        value: `<@!${ticketData.creator}>`,
                                        inline: true,
                                    },
                                    {
                                        name: "Lefoglalta",
                                        value: `<@!${ticketData.claimed}>`,
                                        inline: true,
                                    },
                                    {
                                        name: "Ticket azonosító",
                                        value: `${ticketData.TicketID}`,
                                        inline: true,
                                    },
                                ],
                                type: 'editreply'
                            }, msg)
                        })

                    }
                    else {
                        client.errNormal({
                            error: "Ez nem egy ticket!",
                            type: 'editreply'
                        }, interaction);
                    }
                }
                else {
                    return client.errNormal({
                        error: "Végezd el a beállítást!",
                        type: 'editreply'
                    }, interaction);
                }
            })
        }
    })
}

 