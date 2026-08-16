const Discord = require('discord.js');
const Schema = require("../../database/models/music");

module.exports = async (client, interaction, args) => {
    const webhookClientLogs = new Discord.WebhookClient({
        id: client.webhooks.voiceLogs.id,
        token: client.webhooks.voiceLogs.token,
    });

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({ text: `A csatorna nem létezik!`, type: 'editreply' }, interaction);

    client.radioStart(channel);

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.Channel = channel.id;
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
            }).save();
        }
    })

    client.embed({
        title: `📻・Rádió elindítva`,
        desc: `A rádió sikeresen elindult \nAhhoz, hogy a bot kilépjen, írd be: \`rleave\``,
        fields: [{
            name: "👤┆Elindította",
            value: `${interaction.user} (${interaction.user.tag})`,
            inline: true
        },
        {
            name: "📺┆Csatorna",
            value: `${channel} (${channel.name})`,
            inline: true
        },
        {
            name: "🎶┆Rádióállomás",
            value: `[Radio 538](https://www.538.nl/)`,
            inline: true
        },
        ],
        type: 'editreply'
    }, interaction)

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📻・Rádió elindítva`)
        .setDescription(`_______________ \n\nA rádió sikeresen elindult`)
        .addFields(
            { name: "👤┆Elindította", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
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

 