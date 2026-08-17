const Discord = require('discord.js');

const model = require('../../database/models/badge');

const webhookClientLogs = new Discord.WebhookClient({
    id: "",
    token: "",
});

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

    const boolean = interaction.options.getBoolean('new');
    const member = interaction.options.getUser('user');
    const badge = interaction.options.getString('badge');

    let Badges = await model.findOne({ User: member.id });

    if (!badgeFlags[badge.toUpperCase()]) return client.errNormal({
        error: `Nem található ez a jelvény`,
        type: `editreply`
    }, interaction);

    if (boolean == true) {
        if (Badges) {
            if (Badges.FLAGS.includes(badge.toUpperCase())) return client.errNormal({
                error: `Ennek a felhasználónak már megvan ez a jelvénye!`,
                type: `editreply`
            }, interaction);

            let FLAG = badge.toUpperCase();
            let array = Badges.FLAGS;

            array.push(FLAG);

            model.findOne({ User: member.id }, async (err, data) => {
                if (err) console.log(err);
                data.FLAGS = array
                data.save();
            });

            client.succNormal({
                text: `Hozzáadva a(z) ${badgeFlags[badge.toUpperCase()]} (${badge.toUpperCase()}) jelvény!`,
                type: `editreply`
            }, interaction);
        } else {
            const newSettings = new model({ User: member.id, FLAGS: [badge.toUpperCase()] });
            await newSettings.save().catch(() => { });

            client.succNormal({
                text: `Hozzáadva a(z) ${badgeFlags[badge.toUpperCase()]} (${badge.toUpperCase()}) jelvény!`,
                type: `editreply`
            }, interaction)
        }

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`📛・Jelvény hozzáadva`)
            .setDescription(`Új jelvény hozzáadva ${member} (${member.id}) felhasználóhoz`)
            .addFields(
                { name: "👤┆Hozzáadta", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: `📛┆Jelvény`, value: `${badgeFlags[badge.toUpperCase()]} (${badge.toUpperCase()})`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setFooter({ text: client.config.discord.footer})
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Badges',
            embeds: [embedLogs],
        });
    }
    else if (boolean == false) {
        if (!Badges.FLAGS.includes(badge.toUpperCase())) return client.errNormal({
            error: `Ennek a felhasználónak nincs meg ez a jelvénye`,
            type: `editreply`
        }, interaction);

        let FLAG = badge.toUpperCase();
        let array = Badges.FLAGS;

        for (var i = 0; i < array.length; i++) {

            if (array[i] === FLAG) {
                array.splice(i, 1);
                i--;
            }
        }

        if (!array[0]) {
            let deleted = await model.deleteMany({ User: member.id });
            client.succNormal({
                text: `Eltávolítva a(z) ${badgeFlags[badge.toUpperCase()]} (${badge.toUpperCase()}) jelvény, a felhasználó eltávolításra került a jelvényrendszerből, nincs több jelvénye!`,
                type: 'editreply'
            }, interaction);

        } else {
            model.findOne(
                { User: member.id },
                async (err, data) => {
                    if (err) console.log(err);
                    data.FLAGS = array
                    data.save();
                }
            );
            client.succNormal({
                text: `Eltávolítva a(z) ${badgeFlags[badge.toUpperCase()]} (${badge.toUpperCase()}) jelvény!`,
                type: 'editreply'
            }, interaction);
        }

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`📛・Jelvény eltávolítva`)
            .setDescription(`Jelvény eltávolítva ${member} (${member.id}) felhasználótól`)
            .addFields(
                { name: "👤┆Eltávolította", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: `📛┆Jelvény`, value: `${badgeFlags[badge.toUpperCase()]} (${badge.toUpperCase()})`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setFooter({ text: client.config.discord.footer })
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Badges',
            embeds: [embedLogs],
        });
    }
}

 