const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = async (client, interaction, args) => {
    const country = interaction.options.getString('location');

    weather.find({ search: country, degreeType: 'C' }, function (error, result) {
        if (result === undefined || result.length === 0) return client.errNormal({
            error: "**Érvénytelen** helyszín",
            type: 'editreply'
        }, interaction);

        var current = result[0].current;
        var location = result[0].location;

        client.embed({
            title: `☀️・Időjárás - ${current.skytext}`,
            desc: `Időjárás előrejelzés ide: ${current.observationpoint}`,
            thumbnail: current.imageUrl,
            fields: [
                {
                    name: "Időzóna",
                    value: `UTC${location.timezone}`,
                    inline: true,
                },
                {
                    name: "Mértékegység",
                    value: `Celsius`,
                    inline: true,
                },
                {
                    name: "Hőmérséklet",
                    value: `${current.temperature}°`,
                    inline: true,
                },
                {
                    name: "Szél",
                    value: `${current.winddisplay}`,
                    inline: true,
                },
                {
                    name: "Hőérzet",
                    value: `${current.feelslike}°`,
                    inline: true,
                },
                {
                    name: "Páratartalom",
                    value: `${current.humidity}%`,
                    inline: true,
                }
            ],
            type: 'editreply'
        }, interaction)
    })
}

 