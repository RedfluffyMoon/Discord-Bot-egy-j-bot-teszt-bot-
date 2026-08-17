const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('family')
        .setDescription('Család létrehozása a Botban')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a family kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('adopt')
                .setDescription('Egy tag örökbefogadása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Családod törlése!'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('disown')
                .setDescription('Egy gyermeked vagy szülőd kitagadása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('divorce')
                .setDescription('Válás a partnerdtől')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('family')
                .setDescription(`Megnézheted, kik vannak valaki családjában!`)
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(false)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('propose')
                .setDescription('Egy tag megkérése házasságra')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true)),
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

 