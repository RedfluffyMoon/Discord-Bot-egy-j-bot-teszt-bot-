const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = await interaction.guild.members.fetch(interaction.options.getUser('user'));
    let amount = interaction.options.getNumber('amount');
    
    if (amount < 0) return client.errNormal({ error: `Nem fizethetsz ki negatív összeget!`, type: 'editreply' }, interaction);

    if (user.id == interaction.user.id) {
        return client.errNormal({
            error: "Nem fizethetsz magadnak!",
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            if (data.Money < parseInt(amount)) return client.errNormal({ error: `Nincs ennyi pénzed!`, type: 'editreply' }, interaction);

            let money = parseInt(amount);

            data.Money -= money;
            data.save();

            client.addMoney(interaction, user, money);

            client.succNormal({
                text: `Kifizettél egy kis pénzt egy felhasználónak!`,
                fields: [
                    {
                        name: `👤┆Felhasználó`,
                        value: `$${user}`,
                        inline: true
                    },
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
            client.errNormal({ text: `Nincs pénzed!`, type: 'editreply' }, interaction);
        }
    })
}

 