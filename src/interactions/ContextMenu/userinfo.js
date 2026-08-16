const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Felhasználói adatok')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ ephemeral: false });
        const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
        if (!member) return client.errNormal({
            error: "Ez a felhasználó nincs ezen a szerveren!",
            type: 'editreply'
        }, interaction);
        const badgeFlags = {
            DEVELOPER: client.emotes.badges.developer,
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
            MARKETING: client.emotes.badges.marketing
        }

        const flags = {
            ActiveDeveloper: "👨‍💻・Active Developer",
            BugHunterLevel1: "🐛・Discord Bug Hunter",
            BugHunterLevel2: "🐛・Discord Bug Hunter",
            CertifiedModerator: "👮‍♂️・Certified Moderator",
            HypeSquadOnlineHouse1: "🏠・House Bravery Member",
            HypeSquadOnlineHouse2: "🏠・House Brilliance Member",
            HypeSquadOnlineHouse3: "🏠・House Balance Member",
            HypeSquadEvents: "🏠・HypeSquad Events",
            PremiumEarlySupporter: "👑・Early Supporter",
            Partner: "👑・Partner",
            Quarantined: "🔒・Quarantined", // Not sure if this is still a thing
            Spammer: "🔒・Spammer", // Not sure if this one works
            Staff: "👨‍💼・Discord Staff",
            TeamPseudoUser: "👨‍💼・Discord Team",
            VerifiedBot: "🤖・Verified Bot",
            VerifiedDeveloper: "👨‍💻・(early)Verified Bot Developer",
        }

        let Badges = await model.findOne({ User: member.user.id });
        if (!Badges) Badges = { User: member.user.id }
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags ? member.user.flags.toArray() : [];

        return client.embed({
            title: `👤・Felhasználói adatok`,
            desc: `Információk erről: ${member.user.username}`,
            thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
            image: member.user.bannerURL({ dynamic: true, size: 1024 }),
            fields: [
                {
                    name: "Felhasználónév",
                    value: `${member.user.username}`,
                    inline: true,
                },
                {
                    name: "Diszkriminátor",
                    value: `${member.user.discriminator}`,
                    inline: true,
                },
                {
                    name: "Becenév",
                    value: `${member.nickname || 'Nincs becenév'}`,
                    inline: true,
                },
                {
                    name: "Azonosító",
                    value: `${member.user.id}`,
                    inline: true,
                },
                {
                    name: "Jelölők",
                    value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Nincs'}`,
                    inline: true,
                },
                {
                    name: "Jelvények",
                    value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Nincs'}`,
                    inline: true,
                },
                {
                    name: "Discordra csatlakozott",
                    value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: "Szerverre csatlakozott",
                    value: `<t:${Math.round(member.joinedAt / 1000)}>`,
                    inline: true,
                },
                {
                    name: `Szerepkörök [${roles.length}]`,
                    value: `${roles.length ? roles.join(', ') : 'Nincs'}`,
                    inline: false,
                }
            ],
            type: 'editreply'
        }, interaction)
    },
};

 