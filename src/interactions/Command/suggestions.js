const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestions')
        .setDescription('A javaslatok kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a suggestions kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('accept')
                .setDescription('Egy javaslat elfogadása')
                .addStringOption(option => option.setName('id').setDescription('A javaslat üzenetének azonosítója').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deny')
                .setDescription('Egy javaslat elutasítása')
                .addStringOption(option => option.setName('id').setDescription('A javaslat üzenetének azonosítója').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('send')
                .setDescription('Javaslat küldése')
                .addStringOption(option => option.setName('suggestion').setDescription('A javaslatod').setRequired(true))
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

 