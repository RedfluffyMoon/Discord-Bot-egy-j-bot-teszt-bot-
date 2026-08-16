const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('casino')
        .setDescription('Kaszinójáték indítása')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a casino kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('blackjack')
                .setDescription('Blackjack játék pénznyerésért')
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crash')
                .setDescription('Több kockázat, nagyobb nyeremény')
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roulette')
                .setDescription('Rulett játék')
                .addStringOption(option => option.setName('color').setDescription('Add meg a hex színkódot').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('slots')
                .setDescription('Nyerőgép játék')
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
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

 