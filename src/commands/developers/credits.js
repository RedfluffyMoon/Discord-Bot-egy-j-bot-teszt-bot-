const Discord = require('discord.js');

const Schema = require('../../database/models/votecredits');

const webhookClientLogs = new Discord.WebhookClient({
    id: "",
    token: "",
});

module.exports = async (client, interaction, args) => {
    const type = interaction.options.getString('type');
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getNumber('amount');

    if (type == "add") {
        Schema.findOne({ User: user.id }, async (err, data) => {
            if (data) {
                data.Credits += amount;
                data.save();
            }
            else {
                new Schema({
                    User: user.id,
                    Credits: amount
                }).save();
            }
        })

        client.succNormal({
            text: `**${amount} kredit** hozzáadva ehhez: ${user}`,
            type: 'editreply'
        }, interaction);

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`🪙・Kredit hozzáadva`)
            .setDescription(`Kredit hozzáadva ehhez: ${user} (${user.id})`)
            .addFields(
                { name: "👤┆Hozzáadta", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: "🔢┆Mennyiség", value: `${amount}`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Credits',
            embeds: [embedLogs],
        });
    }
    else if (type == "remove") {
        Schema.findOne({ User: user.id }, async (err, data) => {
            if (data) {
                data.Credits -= amount;
                data.save();
            }
        })

        client.succNormal({
            text: `**${amount} kredit** eltávolítva innen: ${user}`,
            type: 'editreply'
        }, interaction);

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`🪙・Kredit eltávolítva`)
            .setDescription(`Kredit eltávolítva innen: ${user} (${user.id})`)
            .addFields(
                { name: "👤┆Eltávolította", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: "🔢┆Mennyiség", value: `${amount}`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Credits',
            embeds: [embedLogs],
        });
    }
}

 