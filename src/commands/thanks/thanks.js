const Discord = require('discord.js');

const thanksSchema = require("../../database/models/thanks");
const thanksAuthor = require("../../database/models/thanksAuthor");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    if (!target) return client.errUsage({ usage: "thanks [mention user]", type: 'editreply' }, interaction);

    if (target.id === interaction.user.id) return client.errNormal({ error: `Nem köszönhetsz meg saját magadnak!`, type: 'editreply' }, interaction);

    thanksAuthor.findOne({ User: target.id, Author: interaction.user.id }, async (err, data) => {
        if (data) {
            client.errNormal({ error: `Már megköszönted ezt a felhasználót!`, type: 'editreply' }, interaction);
        }
        else {
            thanksSchema.findOne({ User: target.id }, async (err, data) => {
                if (data) {
                    data.Received += 1;
                    data.save();
                    client.succNormal({ text: `Megköszönted <@${target.id}> felhasználónak! Már \`${data.Received}\` köszönete van`, type: 'editreply' }, interaction);
                }
                else {
                    new thanksSchema({
                        User: target.id,
                        UserTag: target.tag,
                        Received: 1,
                    }).save();
                    client.succNormal({ text: `Megköszönted <@${target.id}> felhasználónak! Már \`1\` köszönete van`, type: 'editreply' }, interaction);
                }
            })

            new thanksAuthor({
                User: target.id,
                Author: interaction.user.id,
            }).save();
        }
    })
}

 