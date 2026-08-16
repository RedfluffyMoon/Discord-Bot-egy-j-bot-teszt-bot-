const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const url = interaction.options.getString('url');
    const text = interaction.options.getString('text');

    if (text.length > 50) return client.errNormal({ error: "A gomb szövege nem lehet hosszabb 50 karakternél", type: 'editreply' }, interaction);

    let button = new Discord.ButtonBuilder()
        .setLabel(`${text}`)
        .setURL(`${url}`)
        .setStyle(Discord.ButtonStyle.Link);

    let row = new Discord.ActionRowBuilder()
        .addComponents(button)

    client.embed({
        title: `🔗・${text}`,
        desc: `Kattints a gombra a link megnyitásához!`,
        components: [row],
        type: 'editreply'
    }, interaction)

}

 