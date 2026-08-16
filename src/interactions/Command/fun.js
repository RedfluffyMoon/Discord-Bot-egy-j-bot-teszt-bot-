const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Szórakoztató parancsok futtatása a Botban')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a fun kategória parancsairól')
        )

        // Meme Commands

        .addSubcommandGroup((group) =>
            group
                .setName('meme')
                .setDescription('A Bot összes vicces meme parancsa')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('confused')
                        .setDescription('Reagálás egy Confused Nick Young meme-mel')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('cleverrate')
                        .setDescription('Megnézheted, mennyire vagy okos')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('dinochrome')
                        .setDescription('Dínó a Chrome-ban')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('epicgamerrate')
                        .setDescription('Megnézheted, mennyire vagy epikus gamer')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('howgay')
                        .setDescription('Megnézheted, mennyire vagy meleg')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('roast')
                        .setDescription('Egy felhasználó lehúzása')
                        .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('simprate')
                        .setDescription('Megnézheted, mennyire vagy simp')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('stankrate')
                        .setDescription('Megnézheted, mennyire vagy büdös')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('rickroll')
                        .setDescription('Egy rickroll kapása')
                )
        )

        // User Commands

        .addSubcommandGroup((group) =>
            group
                .setName('user')
                .setDescription('A Bot összes vicces felhasználói parancsa')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hack')
                        .setDescription('Hackeld meg a barátaidat vagy ellenségeidet!')
                        .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hug')
                        .setDescription('Ölelés adása egy felhasználónak')
                        .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('kill')
                        .setDescription('Egy felhasználó megölése')
                        .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('lovemeter')
                        .setDescription('Megnézheted, mennyire illetek össze valakivel')
                        .addUserOption(option => option.setName('user1').setDescription('Válassz egy felhasználót').setRequired(true))
                        .addUserOption(option => option.setName('user2').setDescription('Válassz egy felhasználót').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('sudo')
                        .setDescription('Mondj valamit valaki más nevében')
                        .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))
                )
        )

        // Text Commands

        .addSubcommandGroup((group) =>
            group
                .setName('text')
                .setDescription('A Bot összes vicces szöveges parancsa')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('ascii')
                        .setDescription('ASCII szöveg készítése')
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('gif')
                        .setDescription('Keresés egy gif után')
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('reverse')
                        .setDescription('Szöveged megfordítása')
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('say')
                        .setDescription('Mondasd ki a bottal, amit szeretnél')
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))
                )
        )

        // Extra Commands

        .addSubcommandGroup((group) =>
            group
                .setName('extra')
                .setDescription('A Bot összes egyéb vicces parancsa')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('birdfact')
                        .setDescription('Egy véletlenszerű madár-tény lekérése')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('catfact')
                        .setDescription('Egy véletlenszerű macska-tény lekérése')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('dogfact')
                        .setDescription('Egy véletlenszerű kutya-tény lekérése')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('fact')
                        .setDescription('Egy véletlenszerű tény lekérése')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('koalafact')
                        .setDescription('Egy véletlenszerű koala-tény lekérése')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('pandafact')
                        .setDescription('Egy véletlenszerű panda-tény lekérése')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('token')
                        .setDescription('Kérd el a tokenemet')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('worldclock')
                        .setDescription('Megjeleníti a világórákat')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('xmas')
                        .setDescription('Megnézheted, hány nap van hátra karácsonyig')
                )
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

 