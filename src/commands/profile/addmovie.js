const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const movie = interaction.options.getString('movie');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Movies) {
                if (data.Movies.includes(movie)) {
                    return client.errNormal({ error: `Ez a film már szerepel az adatbázisodban!`, type: 'editreply' }, interaction);
                }
                data.Movies.push(movie);
                data.save();
            }
            else {
                data.Movies = movie;
                data.save();
            }
            client.succNormal({
                text: "Film hozzáadva",
                fields: [{
                    name: "🎬┆Filmek",
                    value: `\`\`\`${movie}\`\`\``,
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

 