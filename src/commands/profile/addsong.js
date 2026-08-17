const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const song = interaction.options.getString('song');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Songs) {
                if (data.Songs.includes(song)) {
                    return client.errNormal({ error: `Ez a dal már szerepel az adatbázisodban!`, type: 'editreply' }, interaction);
                }
                data.Songs.push(song);
                data.save();
            }
            else {
                data.Songs = song;
                data.save();
            }
            client.succNormal({
                text: "Dal hozzáadva",
                fields: [{
                    name: "🎶┆Dal",
                    value: `\`\`\`${song}\`\`\``,
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

 