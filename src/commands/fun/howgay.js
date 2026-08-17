
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `🏳️‍🌈・Meleg Mérő`,
        desc: `${result}%-ban vagy meleg!`,
        type: 'editreply'
    }, interaction)
}

 