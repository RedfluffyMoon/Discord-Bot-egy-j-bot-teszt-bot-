const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Figyelmeztetés visszavonása')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const perms = await client.checkPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) {
            client.errNormal({
                error: "Nincs jogosultságod ehhez a parancshoz!",
                type: 'ephemeral'
            }, interaction);
            return;
        }
        await interaction.deferReply({ ephemeral: true });

        const member = interaction.guild.members.cache.get(interaction.targetId);

        Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
            if (data) {
                const menu = new Discord.StringSelectMenuBuilder()
                    .setCustomId('unwarn')
                    .setPlaceholder('Válaszd ki a törlendő figyelmeztetést');
                // Get all warnings and add them to a stringselectmenu
                data.Warnings.forEach(element => {
                    menu.addOptions({
                        label: `${element.Case}. eset`,
                        value: element.Case.toString(),
                        description: "Indok: " + element.Reason
                    })
                });
                // Create a new message with the menu
                client.embed({
                    title: `🔨・Figyelmeztetés visszavonása`,
                    desc: `Válaszd ki a törlendő figyelmeztetést innen: **${member.user.tag}**`,
                    components: [new Discord.ActionRowBuilder().addComponents(menu)],
                    type: 'ephemeraledit'
                }, interaction);

                // Create a new collector for the menu
                const filter = i => i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

                collector.on('collect', async i => {
                    if (i.customId === 'unwarn') {
                        // Remove the warning from the database
                        data.Warnings.splice(data.Warnings.findIndex(element => element.Case == i.values[0]), 1);
                        data.save();
                        // Remove the menu from the message
                        i.update({
                            components: []
                        });
                        // Send a success message
                        client.succNormal({
                            text: `A figyelmeztetés sikeresen eltávolítva`,
                            fields: [
                                {
                                    name: "👤┆Felhasználó",
                                    value: `${member}`,
                                    inline: true
                                }
                            ],
                            type: 'ephemeraledit'
                        }, interaction);
                        client.emit('warnRemove', member, interaction.user)
                        client.embed({
                            title: `🔨・Figyelmeztetés visszavonása`,
                            desc: `Egy figyelmeztetésed visszavonásra került itt: **${interaction.guild.name}**`,
                            fields: [
                                {
                                    name: "👤┆Moderátor",
                                    value: interaction.user.tag,
                                    inline: true
                                },
                            ]
                        }, member).catch(() => { })
                    }
                });
            } else {
                client.errNormal({
                    error: "A felhasználónak nincs figyelmeztetése!",
                    type: 'ephemeraledit'
                }, interaction);
            }
        })
    },
};