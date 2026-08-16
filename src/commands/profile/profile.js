const model = require('../../database/models/badge');
const Schema = require('../../database/models/profile');
const CreditsSchema = require("../../database/models/votecredits");

module.exports = async (client, interaction, args) => {

    const badgeFlags = {
        DEVELOPER: client.emotes.badges.developer,
        EVENT: client.emotes.badges.event,
        BOOSTER: client.emotes.badges.booster,
        BUGS: client.emotes.badges.bug,
        MANAGEMENT: client.emotes.badges.management,
        PREMIUM: client.emotes.badges.premium,
        SUPPORTER: client.emotes.badges.supporter,
        TEAM: client.emotes.badges.team,
        BOOSTER: client.emotes.badges.booster,
        PARTNER: client.emotes.badges.partner,
        VOTER: client.emotes.badges.voter,
        SUPPORT: client.emotes.badges.support,
        MODERATOR: client.emotes.badges.moderator,
        DESIGNER: client.emotes.badges.designer,
        MARKETING: client.emotes.badges.marketing,
        ACTIVE: client.emotes.badges.active,
        VIP: client.emotes.badges.vip
    }

    const flags = {
        ActiveDeveloper: "👨‍💻・Aktív fejlesztő",
        BugHunterLevel1: "🐛・Discord Hibavadász",
        BugHunterLevel2: "🐛・Discord Hibavadász",
        CertifiedModerator: "👮‍♂️・Hivatalos moderátor",
        HypeSquadOnlineHouse1: "🏠・House Bravery tag",
        HypeSquadOnlineHouse2: "🏠・House Brilliance tag",
        HypeSquadOnlineHouse3: "🏠・House Balance tag",
        HypeSquadEvents: "🏠・HypeSquad Események",
        PremiumEarlySupporter: "👑・Korai támogató",
        Partner: "👑・Partner",
        Quarantined: "🔒・Karanténban", // Not sure if this is still a thing
        Spammer: "🔒・Spammer", // Not sure if this one works
        Staff: "👨‍💼・Discord Staff",
        TeamPseudoUser: "👨‍💼・Discord Csapat",
        VerifiedBot: "🤖・Hitelesített bot",
        VerifiedDeveloper: "👨‍💻・(korai)Hitelesített bot fejlesztő",
    }

    const user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({ User: user.id }, async (err, data) => {
        if (data) {
            let Badges = await model.findOne({ User: user.id });

            let credits = 0;
            const creditData = await CreditsSchema.findOne({ User: user.id });

            if (Badges && Badges.FLAGS.includes("DEVELOPER")) {
                credits = "∞";
            }
            else if (creditData) {
                credits = creditData.Credits;
            }

            if (!Badges) Badges = { User: user.id };

            const userFlags = user.flags ? user.flags.toArray() : [];

            client.embed({
                title: `${client.user.username}・Profil`,
                desc: '_____',
                thumbnail: user.avatarURL({ dynamic: true }),
                fields: [{
                    name: "👤┆Felhasználó",
                    value: user.username,
                    inline: true
                },
                {
                    name: "📘┆Azonosítócímke",
                    value: user.discriminator,
                    inline: true
                },
                {
                    name: "🆔┆ID",
                    value: user.id,
                    inline: true
                },
                {
                    name: "👨‍👩‍👦┆Nem",
                    value: `${data.Gender || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🔢┆Életkor",
                    value: `${data.Age || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🎂┆Születésnap",
                    value: `${data.Birthday || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🎨┆Kedvenc szín",
                    value: `${data.Color || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🐶┆Kedvenc háziállatok",
                    value: `${data.Pets.join(', ') || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🍕┆Kedvenc ételek",
                    value: `${data.Food.join(', ') || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🎶┆Kedvenc dalok",
                    value: `${data.Songs.join(', ') || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🎤┆Kedvenc előadók",
                    value: `${data.Artists.join(', ') || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🎬┆Kedvenc filmek",
                    value: `${data.Movies.join(', ') || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "👨‍🎤┆Kedvenc színészek",
                    value: `${data.Actors.join(', ') || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🏴┆Származás",
                    value: `${data.Orgin || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "🎮┆Hobbik",
                    value: `${data.Hobbys.join(', ') || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "😛┆Státusz",
                    value: `${data.Status || 'Nincs beállítva'}`,
                    inline: true
                },
                {
                    name: "📛┆Bot Jelvények",
                    value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Nincs'}`,
                    inline: true
                },
                {
                    name: "🏷️┆Discord Jelvények",
                    value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nincs' || 'Nincs'}`,
                    inline: true
                },
                {
                    name: "💳┆Dcredits",
                    value: `${credits || 'Nincs'}`,
                    inline: true
                },
                {
                    name: "ℹ️┆Rólam",
                    value: `${data.Aboutme || 'Nincs beállítva'}`,
                    inline: false
                },], type: 'editreply'
            }, interaction);
        }
        else {
            return client.errNormal({ error: "Nem található profil! Nyiss egyet a /profile create paranccsal", type:'editreply' }, interaction);
        }
    })
}

 