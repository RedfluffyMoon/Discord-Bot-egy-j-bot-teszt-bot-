const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);
            const button = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket')
                .setLabel("Jegyek")
                .setStyle(Discord.ButtonStyle.Primary)
                .setEmoji('🎫')

            const row = new Discord.ActionRowBuilder()
                .addComponents(button)

            client.embed({
                title: "Jegyek",
                desc: "Kattints a 🎫 gombra egy jegy megnyitásához",
                components: [row]
            }, channel)

            client.succNormal({
                text: `A jegypanel sikeresen beállítva!`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Futtasd le előbb a jegyrendszer beállítását!`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 