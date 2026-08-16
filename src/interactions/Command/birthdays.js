const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthdays')
        .setDescription('Egy születésnap megtekintése vagy regisztrálása')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a birthdays kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Születésnapod ellenőrzése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Születésnapod törlése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Az összes születésnap megtekintése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Születésnapod beállítása')
                .addNumberOption(option => option.setName('day').setDescription('A születésnapod napja').setRequired(true))
                .addNumberOption(option => option.setName('month').setDescription('A születésnapod hónapja').setRequired(true))
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

 