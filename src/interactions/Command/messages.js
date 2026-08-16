const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('messages')
        .setDescription('Az üzenetrendszer megtekintése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a messages kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Üzenetek hozzáadása egy felhasználóhoz')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az üzenetek számát').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletereward')
                .setDescription('Egy üzenet-jutalom törlése')
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az üzenetek számát').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('createreward')
                .setDescription('Üzenet-jutalom létrehozása')
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az üzenetek számát').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('A jutalomhoz tartozó szerepkör').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Üzenetek eltávolítása egy felhasználótól')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az üzenetek számát').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('show')
                .setDescription('Üzeneteid megtekintése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rewards')
                .setDescription('Az összes üzenet-jutalom megjelenítése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Az üzenet toplista megtekintése')
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

 