const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const hobby = interaction.options.getString('hobby');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Hobbys) {
                if (!data.Hobbys.includes(hobby)) {
                    return client.errNormal({ error: `Ez a hobbi nem szerepel az adatbázisban!`, type: 'editreply' }, interaction);
                }

                const filtered = data.Hobbys.filter((target) => target !== hobby);

                await Schema.findOneAndUpdate(user, {
                    Hobbys: filtered
                });
            }
            client.succNormal({
                text: "Hobbi eltávolítva",
                fields: [{
                    name: "⚽┆Hobbi",
                    value: `\`\`\`${hobby}\`\`\``,
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

 