const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const artist = interaction.options.getString('artist');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Artists) {
                if (data.Artists.includes(artist)) {
                    return client.errNormal({ error: `Ez az előadó már szerepel az adatbázisodban!`, type: 'editreply' }, interaction);
                }
                data.Artists.push(artist);
                data.save();
            }
            else {
                data.Artists = artist;
                data.save();
            }
            client.succNormal({
                text: "Előadó hozzáadva",
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

 