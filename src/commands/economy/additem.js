const Discord = require('discord.js');

const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const role = interaction.options.getRole('role');
    let amount = interaction.options.getNumber('amount');

    if (!role || !amount) return client.errUsage({ usage: "additem [role] [amount]", type: 'editreply' }, interaction);

    if (isNaN(amount)) return client.errNormal({ error: "Adj meg egy érvényes számot!", type: 'editreply' }, interaction);

    if(role == interaction.guild.roles.everyone) return client.errNormal({ error: "Nem adhatod hozzá az everyone rangot a bolthoz!", type: 'editreply' }, interaction);

    store.findOne({ Guild: interaction.guild.id, Role: role.id }, async (err, storeData) => {
        if (storeData) {
            client.errNormal({ error: `Ez a rang már benne van a boltban!`, type: 'editreply' }, interaction);
        }
        else {

            new store({
                Guild: interaction.guild.id,
                Role: role.id,
                Amount: amount
            }).save();

            client.succNormal({
                text: `A rang hozzá lett adva a bolthoz!`,
                fields: [
                    {
                        name: `🛒┆Rang`,
                        value: `<@&${role.id}>`,
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
    })
}

 