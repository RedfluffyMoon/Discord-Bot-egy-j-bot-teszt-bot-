const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    fetch(
        `https://some-random-api.com/facts/panda`
    )
        .then((res) => res.json()).catch({})
        .then(async (json) => {
            client.embed({
                title: `💡・Véletlenszerű panda tény`,
                desc: json.fact,
                type: 'editreply',
            }, interaction);
        }).catch({})
}

 