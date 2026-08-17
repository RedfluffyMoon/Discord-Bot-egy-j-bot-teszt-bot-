const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('user') || interaction.user;

    if (user.bot) return client.errNormal({
        error: "Egy bot egyenlegét nem nézheted meg!",
        type: 'editreply'
    }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {

            let total = data.Money + data.Bank;

            client.embed({
                title: `${client.emotes.economy.coins}・Egyenleg`,
                fields: [
                    {
                        name: `${client.emotes.economy.pocket}┆Tárca`,
                        value: `$${data.Money}`,
                        inline: true
                    },
                    {
                        name: `${client.emotes.economy.bank}┆Bank`,
                        value: `$${data.Bank}`,
                        inline: true
                    },
                    {
                        name: `💰┆Összesen`,
                        value: `$${total}`,
                        inline: true
                    }
                ],
                desc: `\`${user.tag}\` jelenlegi egyenlege`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `A felhasználónak nincs pénze!`, type: 'editreply'
            }, interaction);
        }
    })
}

 