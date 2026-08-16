const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const question = interaction.options.getString('question');

    var antwoorden = [
        "Igen!",
        "Sajnos nem",
        "Teljesen igazad van!",
        "Nem, sajnálom.",
        "Egyetértek",
        "Fogalmam sincs!",
        "Nem vagyok annyira okos ..",
        "A forrásaim szerint nem!",
        "Ez biztos",
        "Számíthatsz rá",
        "Valószínűleg nem",
        "Minden egy nemre utal",
        "Kétség sem fér hozzá",
        "Egyértelműen",
        "Nem tudom"
    ];
    var resultaat = Math.floor((Math.random() * antwoorden.length));

    client.embed({
        title: `${client.emotes.normal.ball}・8ball`,
        desc: `Íme a válasz a kérdésedre!`,
        fields: [
            {
                name: `💬┆A Kérdésed`,
                value: `\`\`\`${question}\`\`\``,
                inline: false
            },
            {
                name: `🤖┆Bot Válasza`,
                value: `\`\`\`${antwoorden[resultaat]}\`\`\``,
                inline: false
            }
        ],
        type: 'editreply'
    }, interaction);
}

 