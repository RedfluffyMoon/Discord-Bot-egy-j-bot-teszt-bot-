const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const food = interaction.options.getString('food');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Food) {
                if (!data.Food.includes(food)) {
                    return client.errNormal({ error: `Ez az étel nem szerepel az adatbázisban!`, type: 'editreply' }, interaction);
                }

                const filtered = data.Food.filter((target) => target !== food);

                await Schema.findOneAndUpdate(user, {
                    Food: filtered
                });
            }
            client.succNormal({
                text: "Étel eltávolítva",
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

 