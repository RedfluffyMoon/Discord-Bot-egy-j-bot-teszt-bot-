const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {

    let name = interaction.options.getString('name');

    const r = await pop.github(name).catch(() => {
        return client.errNormal({
            error: `Nem található fiók ezzel a felhasználónévvel: ${name}`,
            type: 'editreply'
        }, interaction)

    })

    client.embed({
        title: `🏷️・${r.name}`,
        thumbnail: r.avatar,
        url: r.url,
        fields: [
            {
                name: "💬┇Név",
                value: `${r.name}`,
                inline: true,
            },
            {
                name: "🧑‍💼┇Cég",
                value: `${r.company}`,
                inline: true,
            },
            {
                name: "💬┇Bemutatkozás",
                value: `${r.bio}`,
                inline: true,
            },
            {
                name: "📁┇Nyilvános tárolók",
                value: `${r.public_repos}`,
                inline: true,
            },
            {
                name: "⏰┇Létrehozva",
                value: `<t:${Math.round(new Date(r.created_at).getTime() / 1000)}>`,
                inline: true,
            },
        ], type: 'editreply'
    }, interaction)
}

 