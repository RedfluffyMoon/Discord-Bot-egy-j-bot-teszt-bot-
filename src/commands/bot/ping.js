const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = async (client, interaction, args) => {
    client.simpleEmbed({
        desc: `${client.emotes.animated.loading} Ping számítása...`,
        type: 'editreply'
    }, interaction).then((resultMessage) => {
        const ping = Math.floor(resultMessage.createdTimestamp - interaction.createdTimestamp);

        mongoose.connection.db.admin().ping(function (err, result) {

            var mongooseSeconds = ((result.ok % 60000) / 1000);
            var pingSeconds = ((ping % 60000) / 1000);
            var apiSeconds = ((client.ws.ping % 60000) / 1000);

            client.embed({
                title: `${client.emotes.normal.pong}・Pong`,
                desc: `Nézd meg, milyen gyors a botunk`,
                fields: [
                    {
                        name: "🤖┆Bot késleltetés",
                        value: `${ping}ms (${pingSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "💻┆API késleltetés",
                        value: `${client.ws.ping}ms (${apiSeconds}s)`,
                        inline: true,
                    },
                    {
                        name: "📂┆Adatbázis késleltetés",
                        value: `${result.ok}ms (${mongooseSeconds}s)`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction)
        })
    })
}

 