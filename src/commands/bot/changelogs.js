const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Changelog",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "📃┆Változásnapló",
                value: '2023.03.15. Függőségek frissítve',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 
