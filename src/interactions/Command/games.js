const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('Játékok indítása a Botban')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a games kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('8ball')
                .setDescription('Tegyél fel egy kérdést a botnak')
                .addStringOption(option => option.setName('question').setDescription('A feltenni kívánt kérdés').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fasttype')
                .setDescription('Tanulj meg gyorsabban gépelni'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('music-trivia')
                .setDescription('Zenei kvíz indítása')
                .addNumberOption(option => option.setName('number').setDescription('A dalok száma').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roll')
                .setDescription('Dobókocka dobása'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rps')
                .setDescription('Kő-papír-olló a bot ellen')
                .addStringOption(option =>
                    option.setName('option')
                        .setDescription('Válaszd ki, mit szeretnél')
                        .setRequired(true)
                        .addChoices(
                            { name: '🪨 Kő', value: 'rock' },
                            { name: '📃 Papír', value: 'paper' },
                            { name: '✂️ Olló', value: 'scissors' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('skipword')
                .setDescription('Jelenlegi szó kihagyása'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('snake')
                .setDescription('A snake (kígyó) játék indítása'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('trivia')
                .setDescription('Kvíz indítása'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('willyoupressthebutton')
                .setDescription('A "Megnyomnád a gombot?" játék indítása'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('wouldyourather')
                .setDescription('A "Melyiket választanád?" játék indítása'),
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

 