const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) {
        client.errNormal({
            error: "Nincs jogosultságod ennek a parancsnak a használatához!",
            type: 'editreply'
        }, interaction);
        return;
    }

    const member = interaction.options.getUser('user');


    Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
        if (data) {
            var fields = [];
            data.Warnings.forEach(element => {
                fields.push({
                    name: "Figyelmeztetés **" + element.Case + "**",
                    value: "Indok: " + element.Reason + "\nModerátor <@!" + element.Moderator + ">",
                    inline: true
                })
            });
            client.embed({
                title: `${client.emotes.normal.error}・Figyelmeztetések`,
                desc: `**${member.tag}** figyelmeztetései`,
                fields: [
                    {
                        name: "Összesen",
                        value: `${data.Warnings.length}`,
                    },
                    ...fields
                ],
                type: 'editreply'
            }, interaction)
        }
        else {
            client.embed({
                title: `${client.emotes.normal.error}・Figyelmeztetések`,
                desc: `${member.user.tag} felhasználónak nincs figyelmeztetése!`,
                type: 'editreply'
            }, interaction)
        }
    })
}

