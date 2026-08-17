const Schema = require('../../database/models/profile');
const isHexcolor = require('is-hexcolor');

module.exports = async (client, interaction, args) => {

    const color = interaction.options.getString('color');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            if (!isHexcolor(color)) return client.errNormal({ error: "Nem adtál meg érvényes hex színkódot! Példa: #ff0000", type: 'editreply' }, interaction);

            data.Color = color;
            data.save();

            client.succNormal({
                text: "Kedvenc színed beállítva",
                fields: [{
                    name: "🎨┆Szín",
                    value: `\`\`\`${color}\`\`\``,
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

 