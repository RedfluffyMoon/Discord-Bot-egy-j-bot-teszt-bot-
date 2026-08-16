const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('A meghívórendszer megtekintése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az invites kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Meghívók hozzáadása egy felhasználóhoz')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg a meghívók számát').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Meghívók eltávolítása egy felhasználótól')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg a meghívók számát').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('show')
                .setDescription('Meghívóid megtekintése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('A meghívó toplista megtekintése')
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

 