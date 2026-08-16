const Discord = require('discord.js');

const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const role = interaction.options.getRole('role');

    if (!role) return client.errUsage({ usage: "deleteitem [role]", type: 'editreply' }, interaction);

    store.findOne({ Guild: interaction.guild.id, Role: role.id }, async (err, storeData) => {
        if (storeData) {

            var remove = await store.deleteOne({ Guild: interaction.guild.id, Role: role.id });

            client.succNormal({
                text: `A rang törölve lett a boltból`,
                fields: [
                    {
                        name: `🛒┆Rang`,
                        value: `${role}`
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
        else {

            client.errNormal({
                error: `Ez a rang nincs benne a boltban!`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 