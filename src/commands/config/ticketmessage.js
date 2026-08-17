const Discord = require('discord.js');

const Schema = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const type = interaction.options.getString('type');
    const message = interaction.options.getString('message');

    if (type == "open") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.openTicket = "Köszönjük, hogy jegyet nyitottál! \nA support hamarosan jelentkezik nálad \n\n🔒 - Jegy bezárása \n✋ - Jegy átvétele \n📝 - Átirat mentése \n🔔 - Értesítés küldése";
                data.save();

                client.succNormal({
                    text: `A jegyüzenet sikeresen beállítva`,
                    fields: [
                        {
                            name: `📘┆Üzenet típusa`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Üzenet`,
                            value: `${data.openTicket}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Nem található jegyüzenet adat!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.openTicket = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    openTicket: message
                }).save();
            }
        })

        client.succNormal({
            text: `A jegyüzenet sikeresen beállítva`,
            fields: [
                {
                    name: `📘┆Üzenet típusa`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Üzenet`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
    else if (type == "close") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.dmMessage = "Itt van a jegyed átirata, tartsd meg, ha valaha vissza szeretnél rá nézni!";
                data.save();

                client.succNormal({
                    text: `A jegyüzenet sikeresen beállítva`,
                    fields: [
                        {
                            name: `📘┆Üzenet típusa`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `💬┆Üzenet`,
                            value: `${data.dmMessage}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Nem található jegyüzenet adat!`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.dmMessage = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    dmMessage: message
                }).save();
            }
        })

        client.succNormal({
            text: `A jegyüzenet sikeresen beállítva`,
            fields: [
                {
                    name: `📘┆Üzenet típusa`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `💬┆Üzenet`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}

 