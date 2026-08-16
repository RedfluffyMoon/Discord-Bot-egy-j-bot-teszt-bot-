const fetch = require("node-fetch");
const generator = require('generate-password');

module.exports = async (client, interaction, args) => {

    const password = generator.generate({
        length: 10,
        symbols: true,
        numbers: true
    });

    const user = interaction.options.getUser('user');

    if (!user) return client.errUsage({ usage: "hack [mention user]", type: 'editreply' }, interaction)

    function wait(ms) {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    client.embed({
        title: '💻・Hackelés',
        desc: `A(z) ${user} elleni hack elindult...`,
        type: 'editreply'
    }, interaction).then(msg => {

        wait(140);
        client.embed({
            title: '💻・Hackelés',
            desc: `Felhasználói információk keresése..`,
            type: 'edit',
        }, msg).then(i => {

            wait(133);
            client.embed({
                title: '💻・Hackelés',
                desc: `IP cím keresése...`,
                type: 'edit',
            }, msg).then(i => {

                wait(140);
                client.embed({
                    title: '💻・Hackelés',
                    desc: `A felhasználó IP címét megtaláltuk!`,
                    fields: [
                        {
                            name: '🔗┆IP Cím',
                            value: `\`\`\`127.0.0.1\`\`\``,
                            inline: true,
                        }
                    ],
                    type: 'edit',
                }, msg).then(i => {

                    wait(60);
                    client.embed({
                        title: '💻・Hackelés',
                        desc: `Discord bejelentkezés keresése...`,
                        type: 'edit',
                    }, msg).then(i => {

                        wait(230);
                        client.embed({
                            title: '💻・Hackelés',
                            desc: `A felhasználó Discord bejelentkezését megtaláltuk!`,
                            fields: [
                                {
                                    name: '📨┆Email',
                                    value: `\`\`\`${user.username}onDiscord@gmail.com\`\`\``
                                },
                                {
                                    name: '🔑┆Jelszó',
                                    value: `\`\`\`${password}\`\`\``
                                }
                            ],
                            type: 'edit',
                        }, msg).then(i => {

                            wait(200);
                            client.embed({
                                title: '💻・Hackelés',
                                desc: `Discord token keresése...`,
                                type: 'edit'
                            }, msg).then(i => {

                                wait(200);
                                fetch(`https://some-random-api.com/bottoken?${user.id}`).then((res) => res.json()).catch({}).then(async (json) => {
                                    client.embed({
                                        title: '💻・Hackelés',
                                        desc: `A felhasználó Discord fiók tokenjét megtaláltuk!`,
                                        fields: [
                                            {
                                                name: '🔧┆Token',
                                                value: `\`\`\`${json.token}\`\`\``,
                                                inline: true
                                            }
                                        ],
                                        type: 'edit',
                                    }, msg).then(i => {

                                        wait(140);
                                        client.embed({
                                            title: '💻・Hackelés',
                                            desc: `Fiók bejelentése a Discordnak a felhasználási feltételek megszegése miatt...`,
                                            type: 'edit',
                                        }, msg).then(i => {

                                            wait(180);
                                            client.succNormal({ text: `${user} sikeresen meg lett hackelve. A felhasználó összes információját elküldtük a DM-edbe`, type: 'edit' }, msg);
                                            client.embed({
                                                title: '😂・Átverve',
                                                image: "https://media1.tenor.com/images/05006ed09075a0d6965383797c3cea00/tenor.gif?itemid=17987788",
                                            }, interaction.user)
                                        })
                                    })
                                }).catch({})
                            })
                        })
                    })
                })
            })
        })
    })

}

 