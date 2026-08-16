const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const model = require('../../database/models/badge');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Előre elkészített üzenetek küldése')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Válassz egy üzenetet')
                .setRequired(true)
                .addChoices(
                    { name: 'Információk', value: 'information' },
                    { name: 'Szabályzat', value: 'rules' },
                    { name: 'Jelentkezések', value: 'applications' },
                    { name: 'Ügyfélszolgálat', value: 'helpdesk' },
                    { name: 'Hálózat', value: 'network' },
                    { name: 'Bot-Info', value: 'botinfo' },
                    { name: 'Bot-Jelvények', value: 'badges' },
                    { name: 'Bot-Béta', value: 'beta' },
                    { name: 'Bot-Credits', value: 'credits' }
                )
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        model.findOne({ User: interaction.user.id }, async (err, data) => {
            if (data && data.FLAGS.includes("DEVELOPER")) {

                const message = interaction.options.getString('message');

                client.succNormal({
                    text: `Az üzenet sikeresen elküldve!`,
                    type: 'ephemeraledit'
                }, interaction);

                if (message == "information") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/937338297036967946/techpoint_channel_banner_about.jpg?width=812&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `ℹ️・Információk`,
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            fields: [
                                {
                                    name: `👋┆Üdvözlünk a Bot Support szerveren!`,
                                    value: `Üdvözlünk a támogatási szerverünkön! A Bot és a Bot 2 botjainkra fókuszálunk. Maradj naprakész, tedd fel kérdéseidet és próbáld ki a botjainkat.`,
                                },
                                {
                                    name: `❓┆Mit tehetek itt?`,
                                    value: `- Olvasd a legfrissebb bot híreket\n- Próbáld ki a bot parancsait\n- Tedd fel kérdéseidet\n- Kérj segítséget a bot beállításához a szerveredben`,
                                },
                                {
                                    name: `🤖┆Mi az a Bot és a Bot 2?`,
                                    value: `Ezt az információt megtalálod a <#897221483460444170> csatornában.`,
                                },
                                {
                                    name: `🔗┆Egyéb szervereink`,
                                    value: `[Tech szerver](https://discord.gg/bEJhVa6Ttv) - Segítséget kaphatsz kóddal, technológiával és kriptóval kapcsolatban, miközben olvasod a legfrissebb híreket\n[Kitiltás elleni fellebbezés](https://discord.gg/htf9pHNRxA) - Kitiltottak? Kérj feloldást`,
                                },
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })
                }

                if (message == "rules") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/937338297968123904/techpoint_channel_banner_rules.jpg?width=812&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `📃・Szabályzat`,
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            desc: `Ezek a szerverünk szabályai. Kérünk, tartsd be őket, hogy mindenki jól érezze magát. Az adminok és moderátorok saját belátásuk szerint alkalmaznak időzített kizárást, kirúgást vagy kitiltást`,
                            fields: [
                                {
                                    name: `1. Légy tisztelettudó`,
                                    value: `Minden felhasználót tisztelnünk kell, függetlenül attól, hogy mennyire kedveled őket. Bánj másokkal úgy, ahogy te szeretnéd, hogy veled bánjanak.`,
                                },
                                {
                                    name: `2. Nincs helye trágárságnak`,
                                    value: `A trágár nyelvezet használatát minimálisra kell szorítani. Bármilyen lealacsonyító hangnem bármely felhasználóval szemben tilos.`,
                                },
                                {
                                    name: `3. Ne spammelj`,
                                    value: `Ne küldj sok kis üzenetet egymás után. Ne zavard meg a beszélgetést spammeléssel.`,
                                }, {
                                    name: `4. Nincs pornográf/felnőtt/egyéb NSFW tartalom`,
                                    value: `Ez egy közösségi szerver, nem ilyen jellegű tartalom megosztására szolgál.`,
                                },
                                {
                                    name: `5. Nincs reklámozás`,
                                    value: `Semmilyen fajta reklámot nem tolerálunk, legyen szó más közösségekről vagy streamekről. A tartalmadat a média csatornán megoszthatod, ha releváns és valódi értéket ad (videó/rajz)`,
                                },
                                {
                                    name: `6. Nincs sértő név és profilkép`,
                                    value: `Meg fogunk kérni a neved vagy képed megváltoztatására, ha a stáb nem megfelelőnek ítéli azokat.`,
                                },
                                {
                                    name: `7. Szerver raidelés`,
                                    value: `Raidelés vagy annak említése nem megengedett.`,
                                },
                                {
                                    name: `8. Közvetlen és közvetett fenyegetések`,
                                    value: `Más felhasználók fenyegetése DDoS-szal, halállal, doxxolással, zaklatással és egyéb rosszindulatú módon szigorúan tilos és nem megengedett.`,
                                },
                                {
                                    name: `9. Tartsd be a Discord közösségi irányelveit`,
                                    value: `Ezeket itt találod: https://discordapp.com/guidelines`,
                                },
                                {
                                    name: `10. Ne csatlakozz hangcsatornákhoz az ott lévők engedélye nélkül`,
                                    value: `Ha látod, hogy van szabad helyük, nyugodtan csatlakozhatsz és megkérdezheted, van-e szabad hely, de távozz, ha a jelenlétedet nem szeretné az, aki előbb ott volt`,
                                }
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })
                }

                if (message == "applications") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/938725909068918854/techpoint_channel_banner_applications.jpg?width=812&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `💼・Jelentkezések`,
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            desc: `Mi lehetne szórakoztatóbb, mint a legjobb botnál/szervernél dolgozni? Rendszeresen vannak új pozícióink, amikre jelentkezhetsz \n\nDe... mire számíthatsz?`,
                            fields: [
                                {
                                    name: `👥┆Egy nagyon jó csapat`,
                                    value: `A Techpoint Network csapatában mindig kellemes a hangulat és mindenkivel egyenlően bánnak!`,
                                },
                                {
                                    name: `🥳┆Hozzáférés a béta programhoz`,
                                    value: `Hozzáférést kapsz a még ki nem adott Bot funkciókhoz a saját szervereddel! Igazi Bot tesztelő leszel!`,
                                },
                                {
                                    name: `📛┆Egy szép rang és jelvény`,
                                    value: `Egy szép rangot kapsz a szerveren és egy csapat jelvényt a userinfo parancsban. Mindenki láthatja, hogy hozzájárulsz a csapathoz`,
                                },
                                {
                                    name: `📖┆Tanulj és fejlődj`,
                                    value: `Megértjük, hogy nem mindig értesz rögtön mindent! A Botnál lehetőséget adunk arra, hogy új dolgokat tanulj és jobb legyél a pozíciódban. A jövőben akár a vezetői csapatba is fejlődhetsz!`,
                                },
                                {
                                    name: `📘┆Mit jelent mindez?`,
                                    value: `**Moderátor/Support** \nAzzal foglalkozol, hogy a szerveren mindenki jól érezze magát! Csevegj velünk, tartsd az áttekintést és segíts az embereknek a kérdéseikkel.\n\n**Marketing** \nSzeretnénk növekedni, és ezt egy remek marketing csapattal érjük el! Nálad jobban senki sem tudja, hogyan növekedjen jól egy szerver`,
                                },
                                {
                                    name: `📃┆Jelentkeznél?`,
                                    value: `Nyiss egy ticketet a jelentkezésed elküldéséhez!`,
                                }
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })
                }

                if (message == "helpdesk") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/938725908687233034/techpoint_channel_banner_helpdesk.jpg?width=812&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `🎫・Ügyfélszolgálat`,
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            desc: `Van kérdésed vagy problémád? Az alábbiakban megtalálod, hogyan tudsz segítséget kérni tőlünk`,
                            fields: [
                                {
                                    name: `❓┆Van egy kérdésem!`,
                                    value: `Azt javasoljuk, hogy először itt tedd fel a kérdésed: <#937486956697370674>. Itt gyakran vannak csapattagok vagy más emberek, akik segíthetnek. Ha ez sem válik be, nyiss egy ticketet.`,
                                },
                                {
                                    name: `📄┆Ticket szabályok`,
                                    value: `**1.** Légy türelmes, ne tagelj feleslegesen \n**2.** Egyszerre maximum 1 ticketet nyithatsz \n**3.** Ne viselkedj nem megfelelően a ticketekben \n**4.** Ne nyiss ticketet feleslegesen`,
                                },
                                {
                                    name: `⏰┆Válaszidő`,
                                    value: `**08:00 - 16:00** - (+/- 1 óra) \n**16:00 - 22:00** - (+/- 30 perc) \n**22:00 - 08:00** - (+/- 1+ óra)`,
                                },
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })

                }

                if (message == "network") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/938725909387698216/techpoint_channel_banner_network.jpg?width=812&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `🏢・Hálózat`,
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            desc: `A Techpoint Network 3 szerverből álló hálózat. Minden szervernek megvan a saját funkciója. Az egyik a tech/kódolás/kriptó témára, a másik a támogatásra fókuszál. Van egy plusz szerverünk a kitiltás elleni fellebbezésekhez is, olvasd el az alábbi információkat`,
                            fields: [
                                {
                                    name: `💻┇TechPoint`,
                                    value: `Ez egy szerver, ami főleg a technológia köré épülő témákra fókuszál. Például gondolj a titkosításra, kriptóra vagy az összes új kütyüre. Ismerkedj meg új emberekkel, vagy tanulj többet a technológiáról! [Erre](https://discord.gg/bEJhVa6Ttv) a linkre kattintva csatlakozhatsz ehhez a szerverhez`,
                                },
                                {
                                    name: `🤖┇Bot Support`,
                                    value: `Ez az a szerver, amin jelenleg is vagy. Az erről a szerverről szóló összes információt itt találod. [Erre](https://discord.gg/GqhD6RNbzs) a linkre kattintva megkaphatod ennek a szervernek a linkjét`,
                                },
                                {
                                    name: `🔨┇TechPoint Ban Appeal`,
                                    value: `Ez a szerver azoknak szól, akiket kitiltottak egy szerverről vagy a botokról. Itt nyithatsz ticketet, hogy kérd a kitiltásod feloldását, és hogy újra részt vehess a szervereken, vagy újra használhasd a botokat. [Erre](https://discord.gg/q9jZrDk9n6) a linkre kattintva csatlakozhatsz ehhez a szerverhez`,
                                },
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })

                }

                if (message == "botinfo") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/938725909668691978/techpoint_channel_banner_Bot.jpg?width=812&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `ℹ・Bot(ok) információ`,
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            desc: `A közösségen kívül 2 publikus botot is üzemeltetünk. Ezek a botok mind azért készültek, hogy jobbá tegyék a szerveredet!`,
                            fields: [
                                {
                                    name: `🤖┆Mi az a Bot?`,
                                    value: `A Bot egy olyan bot, amivel az egész szerveredet üzemeltetheted! Nem kevesebb, mint 400+ paranccsal egy nagy botot kínálunk, ami sok lehetőséget ad a szervered fejlesztésére, és a legjobb rész, hogy teljesen slash parancsokkal működik! Tudod, mi még ennél is szebb? Mindez **INGYENESEN** használható!`,
                                },
                                {
                                    name: `🎶┆Mi az a Bot 2?`,
                                    value: `A Bot 2 a zenéhez lett létrehozva. Így soha nem lesztek egymás útjában, ha valaki már zenét hallgat. Emellett ez a bot tartalmaz egy soundboardot és egy rádiórendszert is, és a legjobb rész, hogy teljesen slash parancsokkal működik!`,
                                },
                                {
                                    name: `📨┆Hogyan hívom meg a botokat?`,
                                    value: `A botokat meghívhatod a \`/invite\` paranccsal vagy az alábbi linkekre kattintva\n\n**Bot meghívása** - [Meghívás itt](https://discord.com/oauth2/authorize?&client_id=798144456528363550&scope=applications.commands+bot&permissions=8)\n**Bot 2 meghívása** - [Meghívás itt](${client.config.discord.botInvite})`,
                                },
                                {
                                    name: `🎫┆Hogyan kérhetek segítséget, ha szükséges?`,
                                    value: `A kérdéseidet feltehetd az általános csevegésben, vagy további információért nézz körül itt: <#897213893624102965>.`,
                                },
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })

                }

                if (message == "badges") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/938725908028751882/techpoint_channel_banner_soon.jpg?width=813&height=221`
                    }, interaction.channel)
                    // .then(() => {
                    //     client.embed({
                    //         title: `🥇・Badges`,
                    //         thumbnail: "https://media.discordapp.net/attachments/937337957419999272/938725906728513576/techpoint_channel_banner_badges.jpg?width=813&height=221",
                    //         desc: `We at Bot have a special badge system! You can find your badge via the userinfo command. Read below what each badge means`,
                    //         fields: [
                    //             {
                    //                 name: `${client.emotes.badges.bot}┆Bot badge`,
                    //                 value: `This badge is only available for the Bot(s). This way you can see even better that they belong together.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.developer}┆Developer badge`,
                    //                 value: `This badge is only available to Bot developers. This shows that they are official developers of the bots.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.management}┆Management badge`,
                    //                 value: `You can get this badge if you are an official management member of team Bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.team}┆Team badge`,
                    //                 value: `You can get this badge if you are an official team member of team Bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.support}┆Support badge`,
                    //                 value: `You can get this badge if you are an official support member of team Bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.moderator}┆Moderator badge`,
                    //                 value: `You can get this badge if you are an official moderator of team Bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.marketing}┆Marketing badge`,
                    //                 value: `You can get this badge if you are an official marketing member of team Bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.event}┆Organization badge`,
                    //                 value: `You can get this badge if you are an official organization member of team Bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.designer}┆Designer badge`,
                    //                 value: `You can get this badge if you are an official designer of team Bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.booster}┆Booster badge`,
                    //                 value: `You can get this badge if you have boosted a server within our network.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.partner}┆Partner badge`,
                    //                 value: `You can get this badge if you are official partnerd with our server.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.bug}┆Bug Hunter badge`,
                    //                 value: `You can get this badge if you have reported more than 5 bugs in our bot.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.supporter}┆Supporter badge`,
                    //                 value: `You can get this badge if you have given something to Bot to improve the bot even more.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.voter}┆Voter badge`,
                    //                 value: `You can get this badge if you have voted for our bots or servers.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.vip}┆Vip badge`,
                    //                 value: `You can get this badge if you have bought the vip role in the economy system.`,
                    //             },
                    //             {
                    //                 name: `${client.emotes.badges.active}┆Active badge`,
                    //                 value: `You can get this badge if you have bought the active role in the economy system.`,
                    //             }
                    //         ],
                    //         footer: {
                    //             text: `© TechPoint - 2022`,
                    //             iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                    //         }
                    //     }, interaction.channel)
                    // })

                }

                if (message == "beta") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/938725907097604116/techpoint_channel_banner_beta.jpg?width=813&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `🐞・Béta`,
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            desc: `A Bot Béta program az új frissítésekhez szól, amikben még lehetnek hibák. Ennek a programnak köszönhetően kevesebb hiba lesz a kiadáskor! Minden egy másik boton keresztül történik, hogy a jelenlegi bot felhasználókat ne zavarja a béta tesztelés`,
                            fields: [
                                {
                                    name: `📃┆Részvételi feltételek`,
                                    value: `- Minimum 50 tag a szerveren \n- Nem lehet teszt szerver \n- A Discord és a Bot ÁSZF betartása \n- Aktív szerver`,
                                },
                                {
                                    name: `❓┆Hogyan működik?`,
                                    value: `Egy béta botot fogsz használni. Ez azt jelenti, hogy a bot néhány ponton nem működik 100%-osan. Tartsd ezt szem előtt, amikor jelentkezel!`,
                                },
                                {
                                    name: `💼┆Szeretnék jelentkezni!`,
                                    value: `Jó, hogy részt szeretnél venni a Botban! Kérjük, nyiss egy ticketet itt: <#897213893624102965> Küldünk egy űrlapot és esetlegesen további információkat \n\n**Figyelem!** Amikor a frissítés megjelenik, eltávolítunk a programunkból!`,
                                }
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })

                }

                if (message == "credits") {
                    client.simpleEmbed({
                        image: `https://media.discordapp.net/attachments/937337957419999272/938725907659644928/techpoint_channel_banner_credits.png?width=813&height=221`
                    }, interaction.channel).then(() => {
                        client.embed({
                            title: `${client.user.username}・Dcredits`,
                            author: {
                                name: "TechPoint",
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            },
                            thumbnail: "https://media.discordapp.net/attachments/937337957419999272/937463192265846784/techpoint_logo_Bot.jpg?width=812&height=812",
                            fields: [
                                {
                                    name: `ℹ️┆Mik azok a Dcreditek?`,
                                    value: `A Dcreditek olyan kreditek, amiket bizonyos tevékenységek végzésekor kapsz! Ezeket szép előnyökre válthatod be magadnak és a szerverednek`,
                                },
                                {
                                    name: `❓┆Hogyan szerzek Dcrediteket?`,
                                    value: `Jelenleg csak a Botra való szavazással kapsz Dcrediteket. Ezt a top.gg oldalon teheted meg! A kreditek ezután automatikusan hozzáadódnak a fiókodhoz!`,
                                },
                                {
                                    name: `💱┆Mire válthatom be a Dcrediteket?`,
                                    value: `- Bot háttérkép csomag (8 kredit / csomag)\n- Bot logó csomag (6 kredit / csomag)\n- Bot matrica csomag (5 kredit / csomag)\n- Bot 1 éves csomag (10 kredit / csomag)`,
                                },
                                {
                                    name: `🎁┆Hogyan váltom be a Dcrediteket?`,
                                    value: `Háttérkép csomaghoz: \`/dcredits backgroundpack\`\nLogó csomaghoz: \`/dcredits logopack\`\nMatrica csomaghoz: \`/dcredits stickerpack\`\n1 éves csomaghoz: \`/dcredits 1yearpack\``,
                                },
                                {
                                    name: `🐞┆Hibát találtam a rendszerben`,
                                    value: `Valami elromlott a kreditjeiddel? Nyiss egy ticketet itt: <#897213893624102965> és a lehető leghamarabb megoldjuk!`,
                                }
                            ],
                            footer: {
                                text: `© TechPoint - 2022`,
                                iconURL: "https://media.discordapp.net/attachments/937337957419999272/937797574440681472/techpoint_logo-min.jpg?width=812&height=812"
                            }
                        }, interaction.channel)
                    })

                }
            }
            else {
                return client.errNormal({ text: "Csak a Bot 2 fejlesztői tehetik ezt meg", editreply: true }, interaction);
            }
        })
    },
};

 