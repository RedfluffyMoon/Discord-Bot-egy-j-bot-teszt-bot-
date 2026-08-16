const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thanks')
        .setDescription('Áttekintés a köszönetrendszerről')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a thanks kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Köszöneteid megtekintése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('thanks')
                .setDescription('Köszönet mondása egy felhasználónak')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
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

 