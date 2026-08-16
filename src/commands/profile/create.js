const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {
    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            return client.errNormal({ error: "Már van bot profilod", type: "editreply" }, interaction);
        }
        else {
            new Schema({
                User: interaction.user.id
            }).save();

            client.succNormal({ text: "Profil létrehozva! Nézd meg a profilodat a \`profile\` paranccsal", type: "editreply" }, interaction);
        }
    })
}

 