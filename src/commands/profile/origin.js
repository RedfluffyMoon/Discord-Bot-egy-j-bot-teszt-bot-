const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const country = interaction.options.getString('country');

    if (country.length > 50) return client.errNormal({ error: "A származásod nem lehet hosszabb 50 karakternél", type: 'editreply' }, interaction);

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Orgin = country;
            data.save();

            client.succNormal({
                text: "Származásod beállítva",
                fields: [{
                    name: "🌍┆Ország",
                    value: `\`\`\`${country}\`\`\``,
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

 