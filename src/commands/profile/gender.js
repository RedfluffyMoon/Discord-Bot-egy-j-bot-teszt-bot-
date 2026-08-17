const Schema = require('../../database/models/profile');
const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            const menu = new Discord.StringSelectMenuBuilder()
                .setCustomId('gender-setup')
                .setPlaceholder('❌┆Nincs kiválasztva')
                .addOptions(
                    {
                        emoji: "👨",
                        label: `Férfi`,
                        value: `Férfi`,
                    },
                    {
                        emoji: "👩",
                        label: `Nő`,
                        value: `Nő`,
                    },
                    {
                        emoji: "👪",
                        label: `Egyéb`,
                        value: `Egyéb`,
                    }
                );

            const row = new Discord.ActionRowBuilder()
                .addComponents(menu)

            client.embed({
                desc: `Válassz nemet`,
                type: 'editreply',
                components: [row],
            }, interaction).then(msg => {
                const filter = i => i.user.id === interaction.user.id;

                interaction.channel.awaitMessageComponent({ filter, max: 1, componentType: Discord.ComponentType.StringSelect }).then(i => {
                    if (i.customId == 'gender-setup') {
                        data.Gender = i.values[0];
                        data.save();

                        client.succNormal({
                            text: "Nemed beállítva: " + i.values[0],
                            type: 'editreply',
                            components: [],
                        }, interaction);
                    }
                })
            })
        }
        else {
            return client.errNormal({ error: "Nem található profil! Nyiss egyet a createprofile paranccsal", type: 'editreply' }, interaction);
        }
    })
}

 