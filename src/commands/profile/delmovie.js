const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const movie = interaction.options.getString('movie');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Movies) {
                if (!data.Movies.includes(movie)) {
                    return client.errNormal({ error: `Ez a film nem szerepel az adatbázisban!`, type: 'editreply' }, interaction);
                }

                const filtered = data.Movies.filter((target) => target !== movie);

                await Schema.findOneAndUpdate(user, {
                    Movies: filtered
                });
            }
            client.succNormal({
                text: "Film eltávolítva",
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

 