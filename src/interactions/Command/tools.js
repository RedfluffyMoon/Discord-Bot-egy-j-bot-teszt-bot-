const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools')
        .setDescription('Néhány hasznos eszköz használata')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a tools kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('anagram')
                .setDescription('Szó alkotása bizonyos betűkből')
                .addStringOption(option => option.setName('word').setDescription('A megalkotni kívánt szó').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Gomb létrehozása')
                .addStringOption(option => option.setName('url').setDescription('A gomb URL-je').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('A gomb szövege').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('calculator')
                .setDescription('Egy összeg kiszámítása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('decode')
                .setDescription('Bináris kód dekódolása szöveggé')
                .addStringOption(option => option.setName('code').setDescription('A dekódolni kívánt bináris kód').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojify')
                .setDescription('Szöveg átalakítása emojikká')
                .addStringOption(option => option.setName('text').setDescription('Az átalakítani kívánt szöveg').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('encode')
                .setDescription('Szöveg kódolása bináris kóddá')
                .addStringOption(option => option.setName('text').setDescription('A kódolni kívánt szöveg').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('enlarge')
                .setDescription('Egy emoji felnagyítása')
                .addStringOption(option => option.setName('emoji').setDescription('A felnagyítani kívánt emoji').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('mcskin')
                .setDescription('Egy Minecraft-felhasználó skinjének megtekintése')
                .addStringOption(option => option.setName('name').setDescription('A játékos felhasználóneve').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('mcstatus')
                .setDescription('Egy Minecraft-szerver állapotának megtekintése')
                .addStringOption(option => option.setName('ip').setDescription('Az mc szerver IP-je').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pwdgen')
                .setDescription('Jelszó generálása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('qrcode')
                .setDescription('Egy QR-kód küldése a megadott szövegről')
                .addStringOption(option => option.setName('text').setDescription('Az átalakítani kívánt szöveg').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remind')
                .setDescription('Emlékeztető beállítása')
                .addStringOption(option => option.setName('time').setDescription('Az emlékeztető ideje').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('Az emlékeztető üzenete').setRequired(true))

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('sourcebin')
                .setDescription('Kód feltöltése a sourcebinre')
                .addStringOption(option => option.setName('language').setDescription('A kódod nyelve').setRequired(true))
                .addStringOption(option => option.setName('code').setDescription('A kódod').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('url')
                .setDescription('Rövidített URL létrehozása')
                .addStringOption(option => option.setName('site').setDescription('A weboldal linkje').setRequired(true))
                .addStringOption(option => option.setName('code').setDescription('Az URL kódja').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('review')
                .setDescription('Vélemény írása')
                .addNumberOption(option => option.setName('stars').setDescription('A csillagok száma (max 5)').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('Rövid leírás a véleményhez'))
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

 