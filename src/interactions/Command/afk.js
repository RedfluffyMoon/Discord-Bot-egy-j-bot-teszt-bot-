const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('AFK állapotod beállítása')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az afk kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Állítsd magad AFK-ra')
                .addStringOption(option => option.setName('reason').setDescription('Az AFK indoka'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Az összes AFK felhasználó megjelenítése')
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

 