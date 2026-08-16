const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const pet = interaction.options.getString('pet');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Pets) {
                if (data.Pets.includes(pet)) {
                    return client.errNormal({ error: `Ez a háziállat már szerepel az adatbázisodban!`, type: 'editreply' }, interaction);
                }
                data.Pets.push(pet);
                data.save();
            }
            else {
                data.Pets = pet;
                data.save();
            }
            client.succNormal({
                text: "Háziállat hozzáadva",
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

 