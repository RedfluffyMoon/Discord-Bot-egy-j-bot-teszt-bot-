const Discord = require('discord.js');
const Schema = require("../../database/models/customCommandAdvanced");

module.exports = async (client, interaction, args) => {
    const cmdname = interaction.options.getString('command');
    const cmdresponce = interaction.options.getString('text');

    Schema.findOne({ Guild: interaction.guild.id, Name: cmdname.toLowerCase() }, async (err, data) => {
        if (data) {
            client.errNormal({ error: "Ez a parancsnév már hozzá lett adva a szerver egyedi parancsaihoz!", type: 'editreply' }, interaction);
        }
        else {
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('customSelect')
                        .setPlaceholder('❌┆Nincs kiválasztva')
                        .addOptions(
                            [
                                {
                                    label: `Embed`,
                                    description: `Üzenet küldése embedben`,
                                    value: "command-embed",
                                },
                                {
                                    label: `Normál`,
                                    description: `Üzenet küldése normál formában`,
                                    value: "command-normal",
                                },
                                {
                                    label: `Privát`,
                                    description: `Üzenet küldése privátban`,
                                    value: "command-dm",
                                },
                            ]
                        )
                );

            client.embed({ desc: `Milyen művelet legyen hozzárendelve ehhez a parancshoz?`, components: [row], type: 'editreply' }, interaction)

            const filter = i => i.user.id === interaction.user.id;

            interaction.channel.awaitMessageComponent({ filter, max: 1 }).then(async i => {
                if (i.customId == 'customSelect') {
                    await i.deferUpdate();
                    if (i.values[0] === "command-embed") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Embed"
                        }).save();

                        client.succNormal({
                            text: `A parancs sikeresen hozzáadva`,
                            fields: [{
                                name: "🔧┆Parancs",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-normal") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Normal"
                        }).save();

                        client.succNormal({
                            text: `A parancs sikeresen hozzáadva`,
                            fields: [{
                                name: "🔧┆Parancs",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-dm") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "DM"
                        }).save();

                        client.succNormal({
                            text: `A parancs sikeresen hozzáadva`,
                            fields: [{
                                name: "🔧┆Parancs",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    await interaction.guild.commands.create({
                        name: cmdname,
                        description: 'Egyedi szerverparancs'
                    });
                }
            })
        }
    })

}

 