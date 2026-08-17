
module.exports = async (client, interaction, args) => {

    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');

    if (!user1 || !user2) return client.errUsage({ usage: "lovemeter [user1]", type: 'editreply' }, interaction);

    if (user1 == user2) return client.errNormal({ error: "Nem adhatod meg ugyanazt a nevet kétszer!", type: 'editreply' }, interaction);

    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `${client.emotes.normal.heart}・Szerelem Mérő`,
        desc: "Nézd meg, mennyire illetek össze!",
        fields: [
            {
                name: "1. Név",
                value: `${user1}`,
                inline: true,
            },
            {
                name: "2. Név",
                value: `${user2}`,
                inline: true,
            },
            {
                name: "Eredmény",
                value: `**${user2}** és **${user2}** egyezése **${result}%**`,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}

     