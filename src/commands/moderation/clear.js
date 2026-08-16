const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) return;

    const amount = interaction.options.getNumber('amount');

    if (amount > 100) return client.errNormal({
        error: "Nem tudok egyszerre 100-nál több üzenetet törölni!",
        type: 'editreply'
    }, interaction);

    if (amount < 1) return client.errNormal({
        error: "Nem tudok 1-nél kevesebb üzenetet törölni!",
        type: 'editreply'
    }, interaction);

    interaction.channel.bulkDelete(amount + 1).then(() => {
        client.succNormal({
            text: `Sikeresen töröltem az üzeneteket`,
            fields: [
                {
                    name: "💬┆Mennyiség",
                    value: `${amount}`,
                    inline: true
                }
            ],
            type: 'ephemeraledit'
        }, interaction)
    }).catch(err => {
        client.errNormal({
            error: "Hiba történt az üzenetek törlése közben ebben a csatornában!",
            type: 'editreply'
        }, interaction);
    });
}

 