const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({ error: "Ez az üzenetazonosító nem ebből a szerverből származik", type: 'editreply' }, interaction)
    client.giveawaysManager.pause(messageID).then(() => {
        client.succNormal({ 
            text: `Nyereményjáték szüneteltetve!`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Nem található nyereményjáték ezzel az azonosítóval: ${messageID}!`,
            type: 'editreply' 
        }, interaction)
    });
}

 