const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const pet = interaction.options.getString('pet');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Pets) {
                if (!data.Pets.includes(pet)) {
                    return client.errNormal({ error: `Ez a háziállat nem szerepel az adatbázisban!`, type: 'editreply' }, interaction);
                }

                const filtered = data.Pets.filter((target) => target !== pet);

                await Schema.findOneAndUpdate(user, {
                    Pets: filtered
                });
            }
            client.succNormal({
                text: "Háziállat eltávolítva",
                fields: [{
                    name: "🐶┆Háziállat",
                    value: `\`\`\`${pet}\`\`\``,
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

 