const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {

        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.user.id }).then(() => {
                client.succNormal({
                    text: "Profilod törölve lett!",
                    type: 'editreply'
                }, interaction);
            })
        }
        else {
            client.errNormal({
                error: 'Nem található profil!',
                type: 'editreply'
            }, interaction)
        }
    })
}

 