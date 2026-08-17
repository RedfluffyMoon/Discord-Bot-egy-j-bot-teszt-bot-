const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const aboutme = interaction.options.getString('text');

    if (aboutme.length > 1024) return client.errNormal({ error: "A magamról szöveg nem lehet hosszabb 1024 karakternél", type: 'editreply' }, interaction);

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Aboutme = aboutme;
            data.save();

            client.succNormal({
                text: "A magamról szöveg beállítva",
                fields: [{
                    name: "📘┆Rólam",
                    value: `\`\`\`${aboutme}\`\`\``,
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

 