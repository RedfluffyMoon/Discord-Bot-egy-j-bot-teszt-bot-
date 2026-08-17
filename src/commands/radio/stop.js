const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ error: `A csatorna nem létezik!`, type: 'editreply' }, interaction);

    client.radioStop(channel);

    var remove = await Schema.deleteOne({ Guild: interaction.guild.id });

    client.embed({
        title: `📻・Rádió leállítva`,
        desc: `A rádió sikeresen leállt \nAhhoz, hogy a bot csatlakozzon, írd be: \`rplay\``,
        fields: [{
            name: "👤┆Leállította",
            value: `${interaction.user} (${interaction.user.tag})`,
            inline: true
        },
        {
            name: "📺┆Csatorna",
            value: `${channel} (${channel.name})`,
            inline: true
        }
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📻・Rádió leállítva`)
        .setDescription(`_______________ \n\nA rádió sikeresen leállt`)
        .addFields(
            { name: "👤┆Leállította", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
            { name: "📺┆Csatorna", value: `${channel} (${channel.name})`, inline: true },
            { name: "⚙️┆Szerver", value: `${interaction.guild.name} (${interaction.guild.id})`, inline: true },
        )
        .setColor(client.config.colors.normal)
        .setTimestamp();
    webhookClientLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    });
}

 