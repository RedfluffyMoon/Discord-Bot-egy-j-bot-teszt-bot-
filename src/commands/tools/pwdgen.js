const Discord = require('discord.js');
const generator = require('generate-password');

module.exports = async (client, interaction, args) => {

    const password = generator.generate({
        length: 12,
        symbols: true,
        numbers: true
    });

    client.succNormal({ text: `Generáltam egy jelszót és elküldtem privát üzenetben`, type: 'editreply' }, interaction);

    client.succNormal({
        text: `A generált jelszavad`,
        fields: [
            {
                name: "🔑┇Jelszó",
                value: `${password}`,
                inline: true,
            },
            {
                name: "👣┇Hossz",
                value: `12`,
                inline: true,
            }
        ]
    }, interaction.user)

}

 