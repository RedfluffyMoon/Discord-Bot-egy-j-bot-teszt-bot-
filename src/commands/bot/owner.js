const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Tulajdonos információ`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Tulajdonos neve",
            value: `Corwin`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `</Corwin>#0001`,
            inline: true,
        },
        {
            name: "🏢┆Szervezet",
            value: `CoreWare`,
            inline: true,
        },
        {
            name: "🌐┆Weboldal",
            value: `[https://corwindev.nl](https://corwindev.nl)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 