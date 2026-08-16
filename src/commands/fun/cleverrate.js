
module.exports = async (client, interaction, args) => {

    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `💡・Okosság Mérő`,
        desc: `${result}%-ban vagy okos!`,
        type: 'editreply'
    }, interaction)
}

 