
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `🎮・Epikus Gamer Mérő`,
        desc: `${result}%-ban vagy epikus gamer!`,
        type: 'editreply'
    }, interaction)
}

 