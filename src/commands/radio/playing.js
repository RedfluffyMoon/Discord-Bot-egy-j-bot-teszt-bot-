const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📻・Rádió információk`,
        desc: `Minden információ a rádióról ezen a szerveren`,
        fields: [{
            name: "👤┆Csatorna hallgatói",
            value: `${interaction.member.voice.channel.members.size} hallgató`,
            inline: true
        },
        {
            name: "📺┆Csatlakozott csatorna",
            value: `${interaction.member.voice.channel} (${interaction.member.voice.channel.name})`,
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
}

 