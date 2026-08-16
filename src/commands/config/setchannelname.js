const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction)

    if (perms == false) return;

    const name = interaction.options.getString('name');

    if (name.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Csatornanév opciók`,
            desc: `Ezek a csatornanév opciók: \n
            \`{emoji}\` - Csatorna emoji
            \`{name}\` - Csatorna neve`,
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.ChannelTemplate = name
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                ChannelTemplate: name
            }).save();
        }

        client.succNormal({
            text: `A csatorna neve sikeresen beállítva`,
            fields: [
                {
                    name: `💬┆Név`,
                    value: `${name}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    })
}

 