const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');
    const channel = interaction.options.getChannel('channel');

    client.embed({
        title: `📢・Bejelentés!`,
        desc: message
    }, channel);

    client.succNormal({
        text: `A bejelentés sikeresen elküldve!`,
        fields: [
            {
                name: `📘┆Csatorna`,
                value: `${channel} (${channel.name})`
            }
        ],
        type: 'editreply'
    }, interaction);
}

 