const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notepad')
        .setDescription('Jegyzeteid kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a notepad kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Jegyzet hozzáadása a jegyzettömbödhöz')
                .addStringOption(option => option.setName('note').setDescription('A jegyzeted').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Jegyzet törlése a jegyzettömbödből')
                .addStringOption(option => option.setName('id').setDescription('A jegyzet azonosítója').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Jegyzet szerkesztése a jegyzettömbödben')
                .addStringOption(option => option.setName('id').setDescription('A jegyzet azonosítója').setRequired(true))
                .addStringOption(option => option.setName('note').setDescription('Az új jegyzet').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('notes')
                .setDescription('Az összes jegyzeted megjelenítése')
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

 