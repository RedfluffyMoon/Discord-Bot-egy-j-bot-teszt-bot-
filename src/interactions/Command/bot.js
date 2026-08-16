const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Információ a botról')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a bot kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Információ a botról')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('A bot pingjének lekérése ms-ban')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('changelogs')
                .setDescription('A bot változásnaplójának lekérése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('donate')
                .setDescription('A Bot adományozási linkjének lekérése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('links')
                .setDescription('Egy üzenet az összes Bot linkkel')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('owner')
                .setDescription('Információ a tulajdonosról')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('socials')
                .setDescription('A Bot közösségi médiás elérhetőségei')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('support')
                .setDescription('Meghívó a támogató szerverhez')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('uptime')
                .setDescription('A bot üzemidejének megjelenítése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('vote')
                .setDescription('Megnézheted, szavaztál-e már')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('feedback')
                .setDescription('Küldd el a véleményedet a botról a fejlesztőknek')
                .addStringOption(option => option.setName("feedback").setDescription("A visszajelzésed").setRequired(true))
        ),

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

 