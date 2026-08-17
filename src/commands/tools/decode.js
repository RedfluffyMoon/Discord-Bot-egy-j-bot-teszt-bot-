const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const code = interaction.options.getString('code');

    if (isNaN(parseInt(code))) return client.errNormal({
        error: `Csak bináris kódot tudsz dekódolni!`,
        type: 'editreply'
    }, interaction);

    let decode = code.split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');

    client.embed({
        title: `${client.emotes.normal.check}・Siker!`,
        desc: `Dekódoltam a kódot`,
        fields: [
            {
                name: "📥 - Bemenet",
                value: `\`\`\`${code}\`\`\``,
                inline: false,
            },
            {
                name: "📥 - Kimenet",
                value: `\`\`\`${decode}\`\`\``,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)

}

 