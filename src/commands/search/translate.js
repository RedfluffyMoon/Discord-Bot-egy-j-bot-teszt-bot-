const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = async (client, interaction, args) => {

    const language = interaction.options.getString('language');
    const text = interaction.options.getString('text');

    translate(text, { to: language }).then(res => {
        client.embed({
            title: `${client.emotes.normal.check}・Siker!`,
            desc: `A következőt fordítottam le`,
            fields: [
                {
                    name: "📥 - Bemenet",
                    value: `${text}`,
                    inline: false,
                },
                {
                    name: "📤 - Kimenet",
                    value: `${res.text}`,
                    inline: false,
                },
            ],
            type: 'editreply'
        }, interaction);

    }).catch(err => {
        console.log(err)
        client.errNormal({
            error: "Kérlek adj meg egy érvényes ISO nyelvi kódot!",
            type: 'editreply'
        }, interaction);
    })
}

 