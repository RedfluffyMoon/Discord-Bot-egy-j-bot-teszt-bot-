
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `💨・Bűz Mérő`,
        desc: `${result}%-ban vagy büdös!`,
        type: 'editreply'
    }, interaction)
}

 