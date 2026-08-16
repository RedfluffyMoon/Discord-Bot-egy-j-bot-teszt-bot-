const Discord = require('discord.js');
const ms = require('ms');

let timeLength = 50000;
module.exports = async (client, interaction, args) => {

    let list = `Mivel eltévedtünk, vissza kellett mennünk azon az úton, amelyiken jöttünk.
    Egy fiúbandában van, ami nem sok értelmet ad egy kígyónak.
    Egy döglött kacsa nem repül hátrafelé.
    Ne pisilj a kertembe, és ne mondd, hogy segíteni próbálsz a növényeimnek.
    A sikolya elhallgattatta a hangoskodó tinédzsereket.
    A csapattagokat nehéz volt megkülönböztetni, mert mindannyian lófarokban hordták a hajukat.
    Azt hallottam, hogy Nancy nagyon csinos.
    A nudista telepek kerülik a fügefalevél divatot.
    Egy dal képes felderíteni vagy tönkretenni valaki napját, ha hagyja, hogy hatással legyen rá.
    Nem látta az iróniát abban, hogy megkért, változzak meg, miközben azt akarta, fogadjam el olyannak, amilyen.
    A nagybátyám kedvenc időtöltése az volt, hogy tésztából épített autókat.
    Végül rájött, hogy látja a hangokat és hallja a szavakat.
    Kérlek, keress egy csirkeleves receptet az interneten.
    Garynak nem tartott sokáig felfedezni, hogy a rablók amatőrök voltak.
    Hogy sérültél meg?
    Nyilvánvaló volt, hogy meleg van neki, izzad, és fáradt.
    Zavaróan tanácstalannak tűnt.
    A szerelem nem olyan, mint a pizza.
    Mindig veszélyes volt vele autózni, mert ragaszkodott hozzá, hogy a jelzőbóják egy szlalompálya részei.
    Miközben várta, hogy a zuhany felmelegedjen, észrevette, hogy hallja a víz hőmérsékletének változását.
    Üdvözlet a MACS0647-JD galaxisból, amit otthonunknak hívunk.
    A világ sokat változott az elmúlt tíz évben.
    Ahogy belépett a templomba, hallotta valaki halk hangját, aki egy mobiltelefonba suttogott.
    Most el kell gondolkodnom a létezésemen, és meg kell kérdeznem magamtól, hogy tényleg valóságos vagyok-e
    A tegnapi idő jó volt a mászáshoz.
    A gofri mindig jobb tűzhangyák és bolhák nélkül.
    Nancy büszke volt, hogy szigorú kézzel vezetett egy hajóroncsot.
    Annyira azzal volt elfoglalva, hogy vajon képes-e rá, hogy elfelejtette megfontolni, hogy szabad-e.
    Ha a háromtojásos omlett hízást okoz, a törpepapagáj tojása jó helyettesítő.
    Nem tisztelek senkit, aki nem tudja megkülönböztetni a Pepsit a Coca-Colától.
    Megtalálta a szivárvány végét, és meglepődött azon, amit ott talált.
    Azon tűnődött, miért elég idős 18 évesen a háborúhoz, de a cigarettavásárláshoz nem.
    A Monkey Jungle úton lakott, és ez mintha megmagyarázta volna minden furcsaságát.
    Julie egy tökéletes férjet szeretne.
    Hozhatok neked valami innivalót?
    Kérlek, várj a ház előtt.
    A fia megjegyezte, hogy az energiaszeletek nem mások, mint felnőtt cukorkák.
    A nővérem úgy néz ki, mint az anyukám.
    A sűrű lombozat és az összegabalyodott indák szinte lehetetlenné tették a túrát.
    Egy csillogó drágakő nem elég.
    Harminc évvel később még mindig úgy gondolta, rendben van, ha a wc-papírt alulra teszi felülre helyett.
    Mindenkinek, aki ismer téged, más a benyomása arról, ki is vagy valójában.
    Óvatosan menj le a lépcsőn.
    Szembenézve legnagyobb félelmével, megette élete első mályvacukrát.
    Gyémántokat sírt.
    A holnap valami újat hoz, ezért hagyd a mát emlékként magad mögött.
    Erin véletlenül létrehozott egy új univerzumot.
    David inkább a "gyömöszöld be a sátrat a zsákba" módszert követi a szép összehajtogatás helyett.
    A pincérnő nem volt elragadtatva, amikor zöld tojást és sonkát rendelt.
    Csak fel kell venned a tollat, és el kell kezdened.`;

    async function start() {
        const inGame = new Set();
        const filter = m => m.author.id === interaction.user.id;
        if (inGame.has(interaction.user.id)) return;
        inGame.add(interaction.user.id);
        var i;
        for (i = 0; i < 25; i++) {
            const time = Date.now();

            list = list.split("\n");
            let sentenceList = list[Math.floor(Math.random() * list.length)];

            let sentence = '';
            let ogSentence = sentenceList.toLowerCase().replace("    ", "");

            ogSentence.split(' ').forEach(argument => {
                sentence += '`' + argument.split('').join(' ') + '` '
            });

            await client.embed({
                title: `💬・Gyorsgépelés`,
                desc: `Írd be az alábbit ${ms(timeLength, { long: true })} alatt! \n${sentence}`,
                type: 'editreply'
            }, interaction)

            try {
                var msg = await interaction.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: timeLength,
                    errors: ['time']
                });
            } catch (ex) {
                client.errNormal({
                    error: "Lejárt az idő!",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (['cancel', 'end'].includes(msg.first().content.toLowerCase().trim())) {
                msg.first().delete();
                client.succNormal({
                    text: "Befejezve!",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break
            } else if (msg.first().content.toLowerCase().trim() === ogSentence.toLowerCase()) {
                msg.first().delete();
                client.succNormal({
                    text: `Megcsináltad ${ms(Date.now() - time, { long: true })} alatt!`,
                    type: 'editreply'
                }, interaction)
                break;
            } else {
                client.errNormal({
                    error: "Sajnos nem sikerült!",
                    type: 'editreply'
                }, interaction)
                inGame.delete(interaction.user.id)
                break;
            }

            if (i === 25) {
                client.succNormal({ text: `Megcsináltad!`, type: 'editreply' }, interaction)
                inGame.delete(interaction.user.id)
                break
            }
        }
    }

    start()
}

 