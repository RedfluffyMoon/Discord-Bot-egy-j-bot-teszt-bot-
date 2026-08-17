const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id })

    if (ticketData) {
        if (interaction.user.id !== ticketData.creator) {
            const perms = await client.checkUserPerms({
                flags: [Discord.PermissionsBitField.Flags.ManageMessages],
                perms: [Discord.PermissionsBitField.Flags.ManageMessages]
            }, interaction)
        
            if (perms == false) return;

            if (data) {
                if (ticketData.claimed == "" || ticketData.claimed == undefined || ticketData.claimed == "None") {
                    client.errNormal({
                        text: "A ticket nincs lefoglalva!",
                        type: 'ephemeral'
                    }, interaction)
                }
                else {
                    if (ticketData.claimed == interaction.user.id) {
                        const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                        if (ticketCategory == undefined) {
                            return client.errNormal({
                                error: "Végezd el a beállítást!",
                                type: 'editreply'
                            }, interaction);
                        }

                        if (interaction.channel.parentId == ticketCategory.id) {

                            ticketData.claimed = "None";
                            ticketData.save();

                            return client.simpleEmbed({
                                desc: `Ezt a ticketet most már újra le lehet foglalni!`,
                                type: 'editreply'
                            }, interaction)

                        }
                        else {
                            client.errNormal({
                                error: "Ez nem egy ticket!",
                                type: 'editreply'
                            }, interaction)
                        }
                    }
                    else {
                        client.errNormal({
                            error: "Nem te foglaltad le ezt a ticketet!",
                            type: 'editreply'
                        }, interaction)
                    }
                }
            }
            else {
                return client.errNormal({
                    error: "Végezd el a ticket beállítását!",
                    type: 'editreply'
                }, interaction)
            }
        }
    }
}

 