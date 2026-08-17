const Discord = require('discord.js');

const inviteMessages = require("../../database/models/inviteMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Üdvözlőüzenet opciók`,
            desc: `Belépési üzenet opciók: \n
            \`{user:username}\` - A felhasználó felhasználóneve
            \`{user:discriminator}\` - A felhasználó discriminátora
            \`{user:tag}\` - A felhasználó tagje
            \`{user:mention}\` - Felhasználó megemlítése

            \`{inviter:username}\` - A meghívó felhasználóneve
            \`{inviter:discriminator}\` - A meghívó discriminátora
            \`{inviter:tag}\` - A meghívó tagje
            \`{inviter:mention}\` - A meghívó megemlítése
            \`{inviter:invites}\` - A meghívó meghívóinak száma
            \`{inviter:invites:left}\` - A meghívó elveszett meghívóinak száma

            \`{guild:name}\` - Szerver neve
            \`{guild:members}\` - Szerver tagjainak száma`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteJoin = null;
                data.save();

                client.succNormal({
                    text: `Üdvözlőüzenet törölve!`,
                    type: 'editreply'
                }, interaction);
            }
        })
    }
    else {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteJoin = message;
                data.save();
            }
            else {
                new inviteMessages({
                    Guild: interaction.guild.id,
                    inviteJoin: message
                }).save();
            }

            client.succNormal({
                text: `Az üdvözlőüzenet sikeresen beállítva`,
                fields: [
                    {
                        name: `💬┆Üzenet`,
                        value: `${message}`,
                        inline: true
                    },
                ],
                type: 'editreply'
            }, interaction)
        })
    }
}

 