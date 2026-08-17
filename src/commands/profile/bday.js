const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const joined = interaction.options.getString('bday');
    const split = joined.trim().split("/");

    let [day, month] = split;

    if (!day || !month) return client.errUsage({ usage: "setbday [day]/[month]", type: 'editreply' }, interaction);

    if (isNaN(day) || isNaN(month)) {
        return client.errNormal({ error: "A megadott dátum nem érvényes szám", type: 'editreply' }, interaction);
    }

    day = parseInt(day);
    month = parseInt(month);

    if (!day || day > 31) return client.errNormal({ error: "Hibás napformátum!", type: 'editreply' }, interaction);
    if (!month || month > 12) return client.errNormal({ error: "Hibás hónapformátum!", type: 'editreply' }, interaction);

    const bday = `${day}/${month}`;

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Birthday = bday;
            data.save();

            client.succNormal({
                text: "Születésnapod beállítva",
                fields: [{
                    name: "🎂┆Szülinap",
                    value: `\`\`\`${bday}\`\`\``,
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

 