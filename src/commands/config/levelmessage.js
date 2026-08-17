const Discord = require('discord.js');

const Schema = require("../../database/models/levelMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Szintüzenet opciók`,
            desc: `Ezek a szintüzenet opciók: \n
            \`{user:username}\` - A felhasználó felhasználóneve
            \`{user:discriminator}\` - A felhasználó discriminátora
            \`{user:tag}\` - A felhasználó tagje
            \`{user:mention}\` - Felhasználó megemlítése

            \`{user:level}\` - A felhasználó szintje
            \`{user:xp}\` - A felhasználó XP-je`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({ Guild: interaction.guild.id }).then(() => {
                    client.succNormal({ 
                        text: `Szintüzenet törölve!`,
                        type: 'editreply'
                    }, interaction);
                })
            }
        })
    }
    else {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Message = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Message: message
                }).save();
            }

            client.succNormal({
                text: `A szintüzenet sikeresen beállítva`,
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

 