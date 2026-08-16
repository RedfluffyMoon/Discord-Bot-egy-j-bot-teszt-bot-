const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    // Meme Images

    data: new SlashCommandBuilder()
        .setName('soundboard')
        .setDescription('Az összes hang lejátszása a Botban')

        .addSubcommand((subcommand) =>
            subcommand
                .setName('help')
                .setDescription('Információ a soundboard kategória parancsairól')
        )

        // Windows Sounds
        .addSubcommandGroup((group) =>
            group
                .setName('windows')
                .setDescription('A windows hangok lejátszása a Botban')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowserror')
                        .setDescription('A windows hiba hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowsshutdown')
                        .setDescription('A windows leállítás hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('windowsstartup')
                        .setDescription('A windows indítás hang lejátszása')
                )
        )

        // Earrape Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('earrape')
                .setDescription('Az earrape hangok lejátszása a Botban')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('reee')
                        .setDescription('A reee hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('defaultdance')
                        .setDescription('A defaultdance hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('startup')
                        .setDescription('A startup hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('thomas')
                        .setDescription('A thomas hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wegothim')
                        .setDescription('A wegothim hang lejátszása')
                )
        )

        // Song Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('songs')
                .setDescription('A dal hangok lejátszása a Botban')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('dancememe')
                        .setDescription('A dancememe hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('despacito')
                        .setDescription('A despacito hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('elevator')
                        .setDescription('Az elevator hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('rickastley')
                        .setDescription('A rickastley hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('running')
                        .setDescription('A running hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('tobecontinued')
                        .setDescription('A tobecontinued hang lejátszása')
                )
        )

        // Discord Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('discord')
                .setDescription('A discord hangok lejátszása a Botban')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordcall')
                        .setDescription('A discord hívás hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordjoin')
                        .setDescription('A discord hangcsatorna belépés hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('discordleave').setDescription('A discord hangcsatorna kilépés hang lejátszása')
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('discordnotification')
                        .setDescription('A discord értesítés hang lejátszása'),
                )
        )

        // Discord Sounds

        .addSubcommandGroup((group) =>
            group
                .setName('memes')
                .setDescription('A meme hangok lejátszása a Botban')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('fbi')
                        .setDescription('Az fbi hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('jeff')
                        .setDescription('A jeff hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('lambo')
                        .setDescription('A lambo hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('missionfailed')
                        .setDescription('A missionfailed hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('moaning')
                        .setDescription('A moaning hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('nani')
                        .setDescription('A nani hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('nyancat')
                        .setDescription('A nyancat hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('ohh')
                        .setDescription('Az ohh hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('rimshot')
                        .setDescription('A rimshot hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('roblox')
                        .setDescription('A roblox hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('shotdown')
                        .setDescription('A shotdown hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('spongebob')
                        .setDescription('A spongebob hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wow')
                        .setDescription('A wow hang lejátszása'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('yeet')
                        .setDescription('A yeet hang lejátszása'),
                )
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


 