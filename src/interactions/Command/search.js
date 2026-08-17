const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Keresés az interneten')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a search kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bing')
                .setDescription('Keresés a Bingen')
                .addStringOption(option => option.setName('name').setDescription('A keresett kifejezés').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ddg')
                .setDescription('Keresés a DuckDuckGón')
                .addStringOption(option => option.setName('name').setDescription('A keresett kifejezés').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('google')
                .setDescription('Keresés a Google-ön')
                .addStringOption(option => option.setName('name').setDescription('A keresett kifejezés').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('youtube')
                .setDescription('Keresés a YouTube-on')
                .addStringOption(option => option.setName('name').setDescription('A keresett kifejezés').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('corona')
                .setDescription('A koronavírus-statisztikák megtekintése')
                .addStringOption(option => option.setName('country').setDescription('Add meg az országot').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crypto')
                .setDescription('Egy kriptovaluta árfolyamának megtekintése')
                .addStringOption(option => option.setName('coin').setDescription('Add meg a kriptovalutát').setRequired(true))
                .addStringOption(option => option.setName('currency').setDescription('Add meg a pénznemet').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('docs')
                .setDescription('A discord.js dokumentáció megtekintése')
                .addStringOption(option => option.setName('name').setDescription('A keresett kifejezés').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('github')
                .setDescription('GitHub-felhasználó adatainak lekérése a felhasználónév alapján')
                .addStringOption(option => option.setName('name').setDescription('Add meg a GitHub felhasználónevet').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hexcolour')
                .setDescription('Információ egy színről')
                .addStringOption(option => option.setName('color').setDescription('Add meg a hex színkódot').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('itunes')
                .setDescription('Keresés az iTunes-on egy dal után')
                .addStringOption(option => option.setName('song').setDescription('Add meg a dal nevét').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('npm')
                .setDescription('Információ egy NPM csomagról')
                .addStringOption(option => option.setName('name').setDescription('Add meg a csomag nevét').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('steam')
                .setDescription('Információ egy Steam alkalmazásról')
                .addStringOption(option => option.setName('name').setDescription('Add meg a Steam alkalmazás nevét').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('translate')
                .setDescription('Szöveg fordítása')
                .addStringOption(option => option.setName('language').setDescription('Add meg a célnyelvet').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('Add meg a fordítandó szöveget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weather')
                .setDescription('Az aktuális időjárás megtekintése')
                .addStringOption(option => option.setName('location').setDescription('Add meg a helyszín nevét').setRequired(true))
        )
    ,

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

 