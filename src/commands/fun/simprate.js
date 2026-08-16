
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `👀・Simp Mérő`,
        desc: `${result}%-ban vagy simp!`,
        type: 'editreply'
    }, interaction)
}

 