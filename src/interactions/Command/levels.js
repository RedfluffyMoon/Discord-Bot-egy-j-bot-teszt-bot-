const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const Schema = require("../../database/models/functions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('levels')
        .setDescription('A szintrendszer megtekintése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a levels kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setlevel')
                .setDescription('Egy felhasználó szintjének beállítása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('level').setDescription('Add meg az új szintet').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletereward')
                .setDescription('Egy szint-jutalom törlése')
                .addNumberOption(option => option.setName('level').setDescription('Add meg a szintet').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('createreward')
                .setDescription('Szint-jutalom létrehozása')
                .addNumberOption(option => option.setName('level').setDescription('Add meg a szintet').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('A jutalomhoz tartozó szerepkör').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setxp')
                .setDescription('Egy felhasználó XP-jének beállítása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az XP mennyiségét').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rank')
                .setDescription('Jelenlegi ranglistahelyezésed megtekintése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rewards')
                .setDescription('Az összes szint-jutalom megjelenítése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('A szint toplista megtekintése')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const guild = await Schema.findOne({ Guild: interaction.guild.id });
        if (!guild.Levels) return client.errNormal({
            error: `The level system is disabled!`,
            type: 'ephemeral'
        }, interaction);

        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

 