const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    let amount = interaction.options.getNumber('amount');
    let user = interaction.user;

    if (!amount) return client.errUsage({ usage: "deposit [amount]", type: 'editreply' }, interaction);

    if (isNaN(amount)) return client.errNormal({ error: "Adj meg egy érvényes számot!", type: 'editreply' }, interaction);

    if (amount < 0) return client.errNormal({ error: `Nem fizethetsz be negatív összeget!`, type: 'editreply' }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            if (data.Money < parseInt(amount)) return client.errNormal({ error: `Nincs ennyi pénzed!`, type: 'editreply' }, interaction);

            let money = parseInt(amount);

            data.Money -= money;
            data.Bank += money;
            data.save();

            client.succNormal({
                text: `Befizettél egy kis pénzt a bankba!`,
                fields: [
                    {
                        name: `${client.emotes.economy.coins}┆Összeg`,
                        value: `$${amount}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({ text: `Nincs pénzed, amit befizethetnél!`, type: 'editreply' }, interaction);
        }
    })
}
 