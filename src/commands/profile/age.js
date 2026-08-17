const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const age = interaction.options.getNumber('number');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            if (isNaN(age)) return client.errNormal({ error: "Nem adtál meg érvényes számot", type: 'editreply' }, interaction)

            data.Age = age;
            data.save();

            client.succNormal({
                text: "Életkorod beállítva",
                fields: [{
                    name: "📆┆Életkor",
                    value: `\`\`\`${age}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        }
        else {
            return client.errNormal({ error: "Nem található profil! Nyiss egyet a createprofile paranccsal", type:'editreply' }, interaction);
        }
    })
}

 