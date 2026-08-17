const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voice')
        .setDescription('A hangcsatornák kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a voice kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('limit')
                .setDescription('Az egyéni hangcsatornád létszámkorlátjának beállítása')
                .addNumberOption(option => option.setName('limit').setDescription('Add meg a korlátot').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription('Az egyéni hangcsatornád lezárása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rename')
                .setDescription('Az egyéni hangcsatornád átnevezése')
                .addStringOption(option => option.setName('name').setDescription('Az új csatornanév').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription('Az egyéni hangcsatornád feloldása')
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

 