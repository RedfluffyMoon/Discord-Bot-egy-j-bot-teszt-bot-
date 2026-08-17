const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const text = interaction.options.getString('text');

    let encode = text.split("").map(x => x.charCodeAt(0).toString(2)).join(" ");

    client.embed({
        title: `${client.emotes.normal.check}・Siker!`,
        desc: `Átalakítottam a szöveget bináris szöveggé`,
        fields: [
            {
                name: "📥┇Bemenet",
                value: `\`\`\`${text}\`\`\``,
                inline: false,
            },
            {
                name: "📤┇Kimenet",
                value: `\`\`\`${encode}\`\`\``,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)

}

 