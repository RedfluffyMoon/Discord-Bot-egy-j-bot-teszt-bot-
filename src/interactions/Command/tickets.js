const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tickets')
        .setDescription('A ticketek kezelése a szervereden')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a tickets kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Egy felhasználó hozzáadása egy tickethez')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('claim')
                .setDescription('Egy ticket lefoglalása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('close')
                .setDescription('Egy ticket lezárása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Egy ticket törlése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('information')
                .setDescription('Információ egy ticketről')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lower')
                .setDescription('Egy ticket lejjebb helyezése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Ticket létrehozása')
                .addStringOption(option => option.setName('reason').setDescription('A ticket megnyitásának indoka'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('notice')
                .setDescription('Értesítés küldése egy tickethez')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('open')
                .setDescription('Egy ticket újranyitása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('raise')
                .setDescription('Egy ticket feljebb helyezése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Egy felhasználó eltávolítása egy ticketből')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rename')
                .setDescription('Egy ticket átnevezése')
                .addStringOption(option => option.setName('name').setDescription('Az új ticket név').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('transcript')
                .setDescription('Egy ticket átiratának mentése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unclaim')
                .setDescription('Egy ticket lefoglalásának visszavonása')
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

 