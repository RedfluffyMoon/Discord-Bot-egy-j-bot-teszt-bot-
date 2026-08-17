const Discord = require('discord.js');
const figlet = require('figlet');

module.exports = async (client, interaction, args) => {
    const msg = interaction.options.getString('text');

    if (msg.length > 2000) return client.errNormal({ error: "Kérlek adj meg egy 2000 karakternél rövidebb szöveget!", type: 'editreply' }, interaction);

    figlet.text(msg, function (err, data) {

        if (err) {
            return client.errNormal({ error: "Valami hiba történt!", type: 'editreply' }, interaction);
        }

        client.embed({
            title: '💬・Ascii',
            desc: `\`\`\` ${data} \`\`\``,
            type: 'editreply',
        }, interaction);
    })
}

 