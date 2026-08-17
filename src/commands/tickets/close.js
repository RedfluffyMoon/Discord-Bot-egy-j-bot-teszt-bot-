const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");
const ticketMessageConfig = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id });

    let type = 'reply';
    if (interaction.isCommand()) type = 'editreply';

    if (ticketData) {
        if (ticketData.resolved == true) return client.errNormal({
            error: "A ticket már le van zárva!",
            type: 'ephemeraledit'
        }, interaction);

        if (data) {
            const ticketCategory = interaction.guild.channels.cache.get(data.Category);
            const logsChannel = interaction.guild.channels.cache.get(data.Logs);

            if (ticketCategory == undefined) {
                return client.errNormal({
                    error: "Végezd el a beállítást!",
                    type: type
                }, interaction);
            }

            if (interaction.guild.channels.cache.find(c => c.id === ticketCategory.id)) {
                client.users.fetch(ticketData.creator).then(async usr => {
                    interaction.channel.permissionOverwrites.edit(usr, {
                        ViewChannel: false,
                        SendMessages: false,
                        AttachFiles: false,
                        ReadMessageHistory: false,
                        AddReactions: false
                    });

                    try {
                        var closeMessageTicket = "Itt van a ticketed átirata, őrizd meg, ha valaha vissza szeretnél rá nézni!";
                        let ticketMessageData = await ticketMessageConfig.findOne({ Guild: interaction.guild.id });
                        if (ticketMessageData) {
                            closeMessageTicket = ticketMessageData.dmMessage;
                        }

                        client.embed({
                            desc: closeMessageTicket,
                            fields: [
                                {
                                    name: "👤┆Lezárta",
                                    value: `${interaction.user}`,
                                    inline: true
                                },
                                {
                                    name: "📄┆Ticket azonosító",
                                    value: `${ticketData.TicketID}`,
                                    inline: true
                                },
                                {
                                    name: "💬┆Szerver",
                                    value: `${interaction.guild.name}`,
                                    inline: true
                                }
                            ]
                        }, usr)
                        client.transcript(interaction, usr).catch(() => { });
                    }
                    catch (err) { }
                })

                if (logsChannel) {
                    client.embed({
                        title: `🔒・Ticket lezárva`,
                        desc: `A ticket le van zárva`,
                        color: client.config.colors.error,
                        fields: [
                            {
                                name: "📘┆Ticket azonosító",
                                value: `${ticketData.TicketID}`,
                            },
                            {
                                name: "👤┆Lezárta",
                                value: `${interaction.user.tag} (${interaction.user.id})`,
                            },
                            {
                                name: "👤┆Létrehozta",
                                value: `<@!${ticketData.creator}>`,
                            },
                            {
                                name: "✋┆Lefoglalta",
                                value: `<@!${ticketData.creator}>`,
                            },
                            {
                                name: "⏰┆Dátum",
                                value: `<t:${(Date.now() / 1000).toFixed(0)}:F>`,
                            }
                        ]
                    }, logsChannel)
                    client.transcript(interaction, logsChannel);
                }

                ticketData.resolved = true;
                ticketData.save();

                interaction.channel.edit({ name: `ticket-closed` });
                client.simpleEmbed({
                    desc: `A ticketet <@!${interaction.user.id}> zárta le`,
                    type: type
                }, interaction)

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_transcriptTicket')
                            .setEmoji('📝')
                            .setStyle(Discord.ButtonStyle.Primary),

                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_openTicket')
                            .setEmoji('🔓')
                            .setStyle(Discord.ButtonStyle.Primary),

                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_deleteTicket')
                            .setEmoji('⛔')
                            .setStyle(Discord.ButtonStyle.Danger),
                    );

                client.embed({
                    title: "🔒・Lezárva",
                    desc: `📝 - Átirat mentése \n🔓 - Ticket újranyitása \n⛔ - Ticket törlése`,
                    components: [row],
                }, interaction.channel)
            }
            else {
                return client.errNormal({
                    error: "Végezd el a ticket beállítását!",
                    type: type
                }, interaction);

            }
        }
        else {
            return client.errNormal({
                error: "Végezd el a ticket beállítását!",
                type: type
            }, interaction)
        }
    }
}

 