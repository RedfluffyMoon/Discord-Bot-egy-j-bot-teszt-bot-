const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {    
    const text = interaction.options.getString('text');

    if (text.length >= 2000) return client.errNormal({
        error: "Nem használhatsz 2000 karakternél többet!",
        type: 'editreply'
    }, interaction);

    await interaction.channel.send({ content: client.removeMentions(text) }).then(() => {
        client.succNormal({
            text: `Üzenet sikeresen elküldve`,
            type: 'ephemeraledit'
        }, interaction)
    })
}

 