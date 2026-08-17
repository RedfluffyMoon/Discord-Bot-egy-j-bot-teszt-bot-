const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Segítség kérése a bothoz'),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('Bot-helppanel')
                    .setPlaceholder('❌┆Nincs kiválasztva')
                    .addOptions([
                        {
                            label: `Parancsok`,
                            description: `A Bot parancsainak megjelenítése!`,
                            emoji: "💻",
                            value: "commands-Bothelp",
                        },
                        {
                            label: `Meghívás`,
                            description: `A Bot meghívása a szerveredre`,
                            emoji: "📨",
                            value: "invite-Bothelp",
                        },
                        {
                            label: `Támogatói szerver`,
                            description: `Csatlakozz a támogatói szerverhez`,
                            emoji: "❓",
                            value: "support-Bothelp",
                        },
                        {
                            label: `Changelogok`,
                            description: `A bot changelogjainak megjelenítése`,
                            emoji: "📃",
                            value: "changelogs-Bothelp",
                        },
                    ]),
            );

        return client.embed({
            title: `❓・Súgó panel`,
            desc: `Üdvözlünk a Bot súgó paneljén! Készítettünk egy kis áttekintést, hogy segítsünk! Válassz az alábbi menüből`,
            image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
            fields: [
                {
                    name: `❌┆Nem működik a menü?`,
                    value: `Próbáld újraküldeni a parancsot. Ha nem kapsz reakciót, mindenképp jelentsd a hibát!`
                },
                {
                    name: `🪲┆Hibát találtál?`,
                    value: `Jelentsd a \`/report bug\` paranccsal`
                },
                {
                    name: `🔗┆Linkek`,
                    value: `[Weboldal](https://corwindev.nl/) | [Meghívás](${client.config.discord.botInvite}) | [Szavazás](https://top.gg/bot/798144456528363550/vote)`
                },
            ],
            components: [row],
            type: 'editreply'
        }, interaction)
    },
};

 