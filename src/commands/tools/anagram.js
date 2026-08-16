const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    const word = interaction.options.getString('word');

    fetch(`http://www.anagramica.com/all/${encodeURIComponent(word)}`).then((res) => res.json()).catch({})
        .then(async (json) => {
            let content = ``;
            if (!json.all[0]) return client.errNormal({ error: "Nem található szó!", type: 'editreply' }, interaction)

            json.all.forEach(i => {
                content += `${i}\n`;
            });

            client.embed({
                title: `❓・Anagramma`,
                desc: `Szót alkottam a megadott betűkből`,
                fields: [
                    {
                        name: `💬┇Szó(k)`,
                        value: content
                    }
                ],
                type: 'editreply'
            }, interaction)
        }).catch({})

}

 