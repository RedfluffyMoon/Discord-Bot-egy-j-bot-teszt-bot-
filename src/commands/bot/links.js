const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('Bot-linkspanel')
                .setPlaceholder('❌┆Nincs kiválasztva semmi')
                .addOptions([
                    {
                        label: `Támogatói szerver`,
                        description: `Csatlakozz a támogatói szerverhez`,
                        emoji: "❓",
                        value: "support-linkspanel",
                    },
                    {
                        label: `Bot meghívása`,
                        description: `Hívd meg a Botot a szerveredre`,
                        emoji: "📨",
                        value: "invite-linkspanel",
                    },
                    {
                        label: `Közösségi szerver`,
                        description: `Csatlakozz a közösségi szerverhez!`,
                        emoji: "🌍",
                        value: "community-linkspanel",
                    },
                    {
                        label: `Top.gg`,
                        description: `Mutasd a top.gg linket`,
                        emoji: "📃",
                        value: "top.gg-linkspanel",
                    },
                ]),
        );

    client.embed({
        title: `🔗・Linkek`,
        desc: `Érd el az összes Bot linket! Válaszd ki a lenti menüből, amelyikre szükséged van`,
        image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
        components: [row],
        type: 'editreply'
    }, interaction)
}

 