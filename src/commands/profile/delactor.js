const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const actor = interaction.options.getString('actor');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Actors) {
                if (!data.Actors.includes(actor)) {
                    return client.errNormal({ error: `Ez a színész nem szerepel az adatbázisban!`, type: 'editreply' }, interaction);
                }

                const filtered = data.Actors.filter((target) => target !== actor);

                await Schema.findOneAndUpdate(user, {
                    Actors: filtered
                });
            }
            client.succNormal({
                text: "Színész eltávolítva",
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

 