const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 6);

    client.embed({
        title: `🎲・Dobás`,
        desc: `${result}-ot dobtál`,
        type: 'editreply'
    }, interaction);
}

 