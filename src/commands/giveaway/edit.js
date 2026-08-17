const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({ error: "Ez az üzenetazonosító nem ebből a szerverből származik", type: 'editreply' }, interaction)
    client.giveawaysManager.edit(messageID, {
        addTime: 5000,
    }).then(() => {
        const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
        client.succNormal({
            text: `A nyereményjáték kevesebb mint ${numberOfSecondsMax} másodperc múlva frissül`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Nem található nyereményjáték ezzel az azonosítóval: ${messageID}!`,
            type: 'editreply'
        }, interaction)
    });
}

 