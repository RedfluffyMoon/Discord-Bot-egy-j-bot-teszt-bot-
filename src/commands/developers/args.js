const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');

    client.succNormal({
        text: `Az üzenet sikeresen elküldve!`,
        type: 'ephemeraledit'
    }, interaction);

    if (message == "information") {
        client.simpleEmbed({
            image: `https://cdn.discordapp.com/attachments/843487478881976381/874742689017520128/Bot_banner_information.jpg`
        }, interaction.channel).then(() => {
            client.embed({
                title: `ℹ️・Információ`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____`,
                fields: [
                    {
                        name: `👋┆Üdvözlünk itt: ${interaction.guild.name}!`,
                        value: `Üdvözlünk a törzshelyünkön! Ismerj meg új embereket, játssz néhány játékkal, és vegyél részt a szezonális eseményeken! Egy olyan szerver vagyunk, ahol mindenkit összehozunk, és igyekszünk kényelmessé tenni mindenki számára! Érezd jól magad nálunk!`,
                    },
                    {
                        name: `❓┆Mit tehetek itt?`,
                        value: `- Ismerj meg új embereket! \n- Játssz sok szórakoztató játékkal! \n- Fedezd fel az évszakokat! \n- Vegyél részt eseményeken! \nÉs…. végül, de nem utolsósorban, válaszd ki saját szerepköreidet itt: <#847867992044994561>!`,
                    },
                    {
                        name: `🎫┆Hogyan kérhetek segítséget, ha szükségem van rá?`,
                        value: `Nyiss egy jegyet itt: <#820308164322656327>! Szívesen segítünk a kérdéseidben, és támogatást nyújtunk a szerveren!`,
                    },
                    {
                        name: `⚙️┆Szeretnék segíteni a Bot Hangout fejlesztésében!`,
                        value: `- Nézd meg a jelentkezéseket, és lásd, milyen munkák elérhetők! \n- Vagy nyiss egy jegyet, és kérdezd meg, hogyan segíthetsz bizonyos dolgokban! \n\n**Nagyon kellemes és boldog időtöltést kívánunk itt!**`,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "rules") {
        client.simpleEmbed({
            image: `https://cdn.discordapp.com/attachments/843487478881976381/874742702393131038/Bot_banner_rules.jpg`
        }, interaction.channel).then(async () => {
            await client.embed({
                title: `📃・Szabályok`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nEzek a szerverünk szabályai. Kérjük, tartsd be ezeket, hogy mindenki számára szórakoztató maradjon. Az Adminok és Modok saját belátásuk szerint alkalmaznak Némítást/Kirúgást/Kitiltást`,
            }, interaction.channel)

            await client.embed({
                title: `1. Légy tisztelettudó`,
                desc: `Minden felhasználót tisztelnie kell, függetlenül attól, hogy kedveled-e őket vagy sem. Bánj másokkal úgy, ahogy te szeretnéd, hogy veled bánjanak.`,
            }, interaction.channel)

            await client.embed({
                title: `2. Tilos a nem megfelelő nyelvezet`,
                desc: `A trágár kifejezések használatát minimálisra kell szorítani. Ugyanakkor bármilyen lealacsonyító nyelvezet más felhasználók felé tilos.`,
            }, interaction.channel)

            await client.embed({
                title: `3. Tilos a spamelés`,
                desc: `Ne küldj sok apró üzenetet közvetlenül egymás után. Ne zavard meg a csevegést spameléssel.`,
            }, interaction.channel)

            await client.embed({
                title: `4. Tilos a pornográf/felnőtt/egyéb NSFW tartalom`,
                desc: `Ez egy közösségi szerver, és nem ilyen jellegű tartalmak megosztására szolgál.`,
            }, interaction.channel)

            await client.embed({
                title: `5. Tilos a reklámozás`,
                desc: `Semmilyen reklámot nem tolerálunk, legyen szó akár más közösségekről, akár stream-ekről. A tartalmaidat a média csatornában posztolhatod, ha releváns és valódi értéket nyújt (videó/rajz)`,
            }, interaction.channel)

            await client.embed({
                title: `6. Tilos a sértő nevek és profilképek`,
                desc: `Megkérünk, hogy változtasd meg a neved vagy a képed, ha a staff nem megfelelőnek ítéli azt.`,
            }, interaction.channel)

            await client.embed({
                title: `7. Szerver raidelés`,
                desc: `A raidelés vagy annak említése tilos.`,
            }, interaction.channel)

            await client.embed({
                title: `8. Közvetlen és közvetett fenyegetések`,
                desc: `Más felhasználók DDoS-szal, halállal, doxxolással, zaklatással vagy egyéb rosszindulatú fenyegetéssel való fenyegetése szigorúan tilos.`,
            }, interaction.channel)

            await client.embed({
                title: `9. Tartsd be a Discord Közösségi Irányelveit`,
                desc: `Itt találod: https://discordapp.com/guidelines`,
            }, interaction.channel)

            await client.embed({
                title: `10. Ne csatlakozz hangcsatornákhoz az ott lévők engedélye nélkül`,
                desc: `Ha látod, hogy van szabad hely, nyugodtan csatlakozhatsz és megkérdezheted, van-e szabad helyük, de távozz, ha jelenléted nem kívánt annak, aki elsőként volt ott`,
            }, interaction.channel)
        })
    }

    if (message == "applications") {
        client.simpleEmbed({
            image: `https://cdn.discordapp.com/attachments/843487478881976381/874742737415581786/Bot_banner_applications.jpg`
        }, interaction.channel).then(() => {
            client.embed({
                title: `💼・Jelentkezések`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nMi lehetne szórakoztatóbb, mint a legjobb bot/szerver csapatában dolgozni? Rendszeresen vannak új pozíciók, amelyekre jelentkezhetsz \n\nDe... mire számíthatsz?`,
                fields: [
                    {
                        name: `👥┆Egy nagyon jó csapat`,
                        value: `A Bot csapatban mindig kellemes a hangulat, és mindenkivel egyenlően bánunk!`,
                    },
                    {
                        name: `🥳┆Hozzáférés a béta programhoz`,
                        value: `Hozzáférsz a még ki nem adott Bot funkciókhoz a saját szervereden! Igazi Bot tesztelő leszel!`,
                    },
                    {
                        name: `📛┆Egy szép rang és jelvény`,
                        value: `Szép rangot kapsz a szerveren, és egy csapatjelvényt a userinfo parancsunkban. Mindenki láthatja, hogy hozzájárulsz a csapathoz`,
                    },
                    {
                        name: `📖┆Tanulj és fejlődj`,
                        value: `Megértjük, hogy nem mindig érted rögtön az összes dolgot! A Botnál lehetőséget adunk arra, hogy új dolgokat tanulj, és jobb legyél a pozíciódban. A jövőben akár a vezetői csapatba is felnőhetsz!`,
                    },
                    {
                        name: `📘┆Mit is jelent mindez?`,
                        value: `**Moderátor** \nAzzal foglalkozol, hogy a szerveren minden szórakoztató legyen és maradjon mindenki számára! Csevegj velünk, és tartsd az áttekintést \n\n**Marketing** \nMi is szeretnénk növekedni, és ezt egy remek marketing csapattal érjük el! Te tudod a legjobban, hogyan növekedjen jól egy szerver \n\n**Szervezés** \nGondoskodsz egy még jobb hangulatról a szerveren! Egy csapattal együtt dolgozol új és szórakoztató eseményeken, hogy még jobb legyen a szerver!`,
                    },
                    {
                        name: `📃┆Jelentkezel?`,
                        value: `Nyiss egy jegyet, hogy megkapd a jelentkezési lapot!`,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "boosterperks") {
        client.simpleEmbed({
            image: `https://media.discordapp.net/attachments/843487478881976381/881396544195149874/Bot_banner_boosters.jpg`
        }, interaction.channel).then(() => {
            client.embed({
                title: `💎・Booster előnyök`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nTöbb lehetőséget szeretnél a szerveren? Legyél igazi Bot Booster, és szerezz szép előnyöket egy kellemesebb élményért. De mit is kapsz valójában?`,
                fields: [
                    {
                        name: `😛┆Külső matricák használata`,
                        value: `Használj más szerverekről származó matricákat a mi szerverünkön`,
                    },
                    {
                        name: `🔊┆TTS üzenetek küldése`,
                        value: `Küldj olyan üzeneteket, amelyekhez hang tartozik`,
                    },
                    {
                        name: `🤔┆Hozzáférés a rejtett szalonhoz`,
                        value: `Hozzáférsz egy privát szalonhoz, ahol csevegész a többi boosterrel!`,
                    },
                    {
                        name: `📛┆Becenév módosítása`,
                        value: `Változtasd meg a neved a szerveren. Így tűnhetsz ki a szerveren`,
                    },
                    {
                        name: `💭┆Nyilvános/privát szálak létrehozása`,
                        value: `Hozz létre egy szálat a szöveges csatornáinkban`,
                    },
                    {
                        name: `🎉┆Privát nyereményjátékok`,
                        value: `Hozzáférsz szórakoztató, exkluzív nyereményjátékokhoz`,
                    },
                    {
                        name: `📂┆Fájlok küldése bármely csatornán`,
                        value: `Küldj fájlokat minden olyan csatornán, ahol beszélhetsz`,
                    },
                    {
                        name: `📊┆Hozzáférés egy speciális promóciós csatornához`,
                        value: `Lehetőséget kapsz, hogy egy speciális csatornán promózd a saját szervered`,
                    },
                    {
                        name: `😜┆Egyedi, általad választott szerepkör`,
                        value: `Hozz létre saját szerepkört, amelyet magad állíthatsz be`,
                    },
                    {
                        name: `💎┆Kapj booster szerepkört + jelvényt`,
                        value: `Tűnj ki egy szép booster szerepkörrel és egy booster jelvénnyel!`,
                    },
                    {
                        name: `💻┆Hozzáférés az új béta frissítésekhez a Botban`,
                        value: `Hozzáférést adunk a szerverednek olyan frissítésekhez, amelyek még nincsenek kint! Ez nem szép dolog?`,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "links") {
        client.simpleEmbed({
            image: `https://media.discordapp.net/attachments/843487478881976381/881396544195149874/Bot_banner_boosters.jpg`
        }, interaction.channel).then(() => {
            client.embed({
                title: `🔗・Linkek`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nNézd meg a Bot Network összes linkjét!`,
                fields: [
                    {
                        name: `▬▬│Szerverek│▬▬`,
                        value: ``,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "rewards") {
        client.embed({
            title: `😜・Szerepkör jutalmak`,
            thumbnail: client.user.avatarURL({ size: 1024 }),
            desc: `_____ \n\nSzeretnél extrákat a szerveren? Vagy jobban ki szeretnél tűnni a szerveren? Nézd meg lent a jutalmakat`,
            fields: [
                {
                    name: `🏆┆Szintek`,
                    value: `- 5. szint   | <@&833307296699908097>\n- 10. szint  | <@&833307450437664838>\n- 15. szint  | <@&833307452279226379>\n- 30. szint | <@&915290300757458964>\n- 40. szint | <@&915290324480430080>`,
                },
                {
                    name: `🥳┆Különleges`,
                    value: `- 1 szerver szavazat | <@&833959913742794772>\n- 1 boost | <@&744208324022501447>\n- 1 adomány | <@&849554599371210793>`,
                },
                {
                    name: `💰┆Gazdaság`,
                    value: `- $10.000 | <@&890720270086733854>\n- $15.000 | <@&833936202725720084>\n- $20.000 | <@&833936185167839232> \n- $25.000 | <@&928236333309255711> \n- $30.000 | <@&928235747100733450>`,
                }
            ]
        }, interaction.channel)
    }

    if (message == "ourbots") {
        client.simpleEmbed({
            image: `https://cdn.discordapp.com/attachments/843487478881976381/874742741224022016/Bot_banner_bot_info.jpg`
        }, interaction.channel).then(() => {
            client.embed({
                title: `🤖・Botjaink`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nA közösségen kívül még 2 nyilvános botot is üzemeltetünk. Ezek a botok mind azért készültek, hogy jobbá tegyék a szervered!`,
                fields: [
                    {
                        name: `📘┆Mi az a Bot?`,
                        value: `A Bot egy olyan bot, amellyel az egész szerveredet üzemeltetheted! Nem kevesebb, mint 400+ paranccsal egy nagy botot kínálunk, sok lehetőséggel a szervered fejlesztéséhez! Tudod, mi még ennél is szebb? Mindez **INGYENESEN** használható!`,
                    },
                    {
                        name: `🎶┆Mi az a Bot 2?`,
                        value: `A Bot 2 a kiegészítő zenéhez készült. Így soha nem lesztek egymás útjában, ha valaki már zenét hallgat. Emellett ez a bot tartalmaz egy hangtáblát és egy rádiórendszert is`,
                    },
                    {
                        name: `📨┆Hogyan hívhatom meg a botokat?`,
                        value: `A botokat meghívhatod a \`/invite\` paranccsal, vagy az alábbi linkekre kattintva \n\n**Bot** - [Meghívás itt](${client.config.discord.botInvite})`,
                    },
                    {
                        name: `🎫┆Hogyan kérhetek segítséget, ha szükségem van rá?`,
                        value: `Nyiss egy jegyet itt: <#820308164322656327>! Szívesen segítünk a kérdéseidben, és támogatást nyújtunk a szerveren!`,
                    }
                ]
            }, interaction.channel)
        })
    }
}

 