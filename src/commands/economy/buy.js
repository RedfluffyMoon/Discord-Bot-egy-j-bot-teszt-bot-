const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const store = require("../../database/models/economyStore");
const items = require("../../database/models/economyItems");
module.exports = async (client, interaction, args) => {
    const storeData = await store.find({ Guild: interaction.guild.id });
    if (storeData.length == 0) return client.errNormal({
        error: `Nem található bolt ezen a szerveren`,
        type: 'editreply'
    }, interaction);

    let labels = [];

    storeData.forEach(d => {
        const role = interaction.guild.roles.cache.get(d.Role);

        const generated = {
            label: `${role.name.substr(0, 24)}.`,
            value: role.id,
        }

        return labels.push(generated);
    });
    labels.push({
        label: `Horgászbot`,
        value: `fishingrod`,
    })

    const select = await client.generateSelect(`economyBuy`, labels);

    client.embed({
        title: `🛒・${interaction.guild.name} boltja`,
        desc: `Válassz egy tárgyat a menüből a vásárláshoz`,
        components: [select],
        type: 'editreply'
    }, interaction)

    const filter = i => {
        return i.user.id === interaction.user.id;
    };

    interaction.channel.awaitMessageComponent({ filter, componentType: Discord.ComponentType.StringSelect, time: 60000 }).then(async i => {
        const role = i.values[0];
        const buyPerson = i.guild.members.cache.get(i.user.id);

        const data = await Schema.findOne({ Guild: i.guild.id, User: i.user.id });
        if(i.values[0] == 'fishingrod') {
            console.log(data)
            if (parseInt(100) > parseInt(data.Money)) return client.errNormal({
                error: `Nincs elég pénzed ennek a megvásárlásához!`,
                type: 'update',
                components: []
            }, i);

            client.removeMoney(i, i.user, parseInt(100));
            items.findOne({ Guild: i.guild.id, User: i.user.id }, async (err, data) => {
                if (data) {
                    data.FishingRod = true;
                    data.save();
                } else {
                    new items({
                        Guild: i.guild.id,
                        User: i.user.id,
                        FishingRod: true,
                    }).save();
                }
            })
            return client.succNormal({
                text: `A vásárlás sikeresen megtörtént`,
                fields: [
                    {
                        name: `📘┆Tárgy`,
                        value: `Horgászbot`
                    }
                ],
                type: 'update',
                components: []
            }, i);

        }
        const checkStore = await store.findOne({ Guild: i.guild.id, Role: role });

        if (parseInt(checkStore.Amount) > parseInt(data.Money)) return client.errNormal({
            error: `Nincs elég pénzed ennek a megvásárlásához!`,
            type: 'update',
            components: []
        }, i);

        client.removeMoney(i, i.user, parseInt(checkStore.Amount));
        try {
            await buyPerson.roles.add(role);
        } catch (e) {
            return client.errNormal({
                error: `Nem tudom hozzáadni neked a <@&${role}> rangot!`,
                type: 'update',
                components: []
            }, i);
        }

        client.succNormal({
            text: `A vásárlás sikeresen megtörtént`,
            fields: [
                {
                    name: `📘┆Tárgy`,
                    value: `<@&${role}>`
                }
            ],
            type: 'update',
            components: []
        }, i);
    })
}

