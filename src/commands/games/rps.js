const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const option = interaction.options.getString("option");

    let options = ["rock", "paper", "scissors"];
    const result = options[Math.floor(Math.random() * options.length)];

    const names = { rock: "kő", paper: "papír", scissors: "olló" };
    const resultName = names[result];

    switch (option) {
        case "rock":
            if (result == "paper") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, nyertem!`,
                type: 'editreply'
            }, interaction);

            if (result == "scissors") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, te nyertél!`,
                type: 'editreply'
            }, interaction);

            if (result == "rock") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, döntetlen!`,
                type: 'editreply'
            }, interaction);
            break;

        case "paper":
            if (result == "paper") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, döntetlen!`,
                type: 'editreply'
            }, interaction);

            if (result == "scissors") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, nyertem!`,
                type: 'editreply'
            }, interaction);

            if (result == "rock") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, te nyertél!`,
                type: 'editreply'
            }, interaction);
            break;

        case "scissors":
            if (result == "paper") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, te nyertél!`,
                type: 'editreply'
            }, interaction);

            if (result == "scissors") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, döntetlen!`,
                type: 'editreply'
            }, interaction);

            if (result == "rock") return client.embed({
                title: `${client.emotes.normal.paper}・Kő-papír-olló`,
                desc: `Nekem ${resultName} van, nyertem!`,
                type: 'editreply'
            }, interaction);
            break;
    }
}

