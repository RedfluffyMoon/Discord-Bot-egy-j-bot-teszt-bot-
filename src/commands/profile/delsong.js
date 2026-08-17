const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const song = interaction.options.getString('song');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Songs) {
                if (!data.Songs.includes(song)) {
                    return client.errNormal({ error: `Ez a dal nem szerepel az adatbázisban!`, type: 'editreply' }, interaction);
                }

                const filtered = data.Songs.filter((target) => target !== song);

                await Schema.findOneAndUpdate(user, {
                    Songs: filtered
                });
            }
            client.succNormal({
                text: "Dal eltávolítva",
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

 