const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const category = interaction.options.getString('category');
    const role = interaction.options.getRole('role');
    const emoji = interaction.options.getString('emoji');

    const parsedEmoji = Discord.parseEmoji(emoji);
    if (!parsedEmoji) return client.errNormal({
        error: `Ez az emoji nem található ezen a szerveren!`,
        type: 'editreply'
    }, interaction)

    Schema.findOne({ Guild: interaction.guild.id, Category: category }, async (err, data) => {
        if (data) {
            data.Roles[emoji] = [
                role.id,
                {
                    id: parsedEmoji.id,
                    raw: emoji
                }
            ]

            await Schema.findOneAndUpdate({ Guild: interaction.guild.id, Category: category }, data)
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Message: 0,
                Category: category,
                Roles: {
                    [emoji]: [
                        role.id,
                        {
                            id: parsedEmoji.id,
                            raw: emoji
                        }
                    ]
                }
            }).save();
        }

        client.succNormal({
            text: "A reakció szerepkör sikeresen létrehozva! Hozz létre egy panelt az alábbi módon",
            fields: [
                {
                    name: `📘┆Menü panel`,
                    value: `\`/reactionroles menu [kategória neve]\``,
                    inline: true
                },
                {
                    name: `📘┆Gomb panel`,
                    value: `\`/reactionroles button [kategória neve]\``,
                    inline: true
                }
            ],
            type: 'editreply'
        }, interaction);
    })
}

 