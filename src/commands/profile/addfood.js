const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const food = interaction.options.getString('food');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Food) {
                if (data.Food.includes(food)) {
                    return client.errNormal({ error: `Ez az étel már szerepel az adatbázisodban!`, type: 'editreply' }, interaction);
                }
                data.Food.push(food);
                data.save();
            }
            else {
                data.Food = food;
                data.save();
            }
            client.succNormal({
                text: "Étel hozzáadva",
                fields: [{
                    name: "🥐┆Étel",
                    value: `\`\`\`${food}\`\`\``,
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

 