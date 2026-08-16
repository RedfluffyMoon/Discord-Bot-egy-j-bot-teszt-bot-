const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const artist = interaction.options.getString('artist');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Artists) {
                if (!data.Artists.includes(artist)) {
                    return client.errNormal({ error: `Ez az előadó nem szerepel az adatbázisban!`, type: 'editreply' }, interaction);
                }

                const filtered = data.Artists.filter((target) => target !== artist);

                await Schema.findOneAndUpdate(user, {
                    Artists: filtered
                });
            }
            client.succNormal({
                text: "Előadó eltávolítva",
                fields: [{
                    name: "🎤┆Előadó",
                    value: `\`\`\`${artist}\`\`\``,
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

 