const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const actor = interaction.options.getString('actor');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Actors) {
                if (data.Actors.includes(actor)) {
                    return client.errNormal({ error: `Ez a színész már szerepel az adatbázisodban!`, type: 'editreply' }, interaction);
                }
                data.Actors.push(actor);
                data.save();
            }
            else {
                data.Actors = actor;
                data.save();
            }
            client.succNormal({
                text: "Színész hozzáadva",
                fields: [{
                    name: "👨‍🎤┆Színész",
                    value: `\`\`\`${actor}\`\`\``,
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

 