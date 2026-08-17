const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    let type = 'reply';
    if (interaction.isCommand()) type = 'editreply';

    ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id }, async (err, ticketData) => {
        if (ticketData) {
            if (interaction.user.id !== ticketData.creator) {
                ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                    if (data) {
                        const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                        if (ticketCategory == undefined) {
                            return client.errNormal({
                                error: "Végezd el a beállítást!",
                                type: type
                            }, interaction);
                        }

                        if (interaction.channel.parentId == ticketCategory.id) {
                            client.simpleEmbed({
                                desc: `Szia <@!${ticketData.creator}>, \n\nTudunk még segíteni? \nHa nem érkezik válasz **24 órán** belül, lezárjuk ezt a ticketet \n\n- ${interaction.guild.name} csapata`,
                                content: `<@!${ticketData.creator}>`,
                                type: type
                            }, interaction)
                        }
                        else {
                            client.errNormal({
                                error: "Ez nem egy ticket!",
                                type: type
                            }, interaction);

                        }
                    }
                    else {
                        return client.errNormal({
                            error: "Végezd el a beállítást!",
                            type: type
                        }, interaction);
                    }
                })
            }
            else {
                return client.errNormal({
                    error: "Nem küldhetsz értesítést a saját ticketedről!",
                    type: 'ephemeral'
                }, interaction)
            }
        }
    })
}

 