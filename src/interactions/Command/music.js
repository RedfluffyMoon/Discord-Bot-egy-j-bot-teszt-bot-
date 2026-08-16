const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Zenelejátszás a Botban')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a zene kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bassboost')
                .setDescription('A basszuserősítés szintjének beállítása')
                .addStringOption(option =>
                    option.setName('level')
                        .setDescription('A basszuserősítés szintje')
                        .setRequired(true)
                        .addChoices(
                            { name: '0', value: '0' },
                            { name: '1', value: '1' },
                            { name: '2', value: '2' },
                            { name: '3', value: '3' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Zene indítása')
                .addStringOption(option => option.setName('song').setDescription('Add meg egy dal nevét vagy URL-jét').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Zenelejátszási lista törlése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('loop')
                .setDescription('Zene ismétlésének beállítása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lyrics')
                .setDescription('Az aktuális dal szövegének lekérése')
                .addStringOption(option => option.setName('song').setDescription('Add meg egy dal nevét'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playing')
                .setDescription('Megnézheted, melyik dal szól most')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Zene szüneteltetése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('previous')
                .setDescription('Előző dal lejátszása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('queue')
                .setDescription('Lejátszási lista megtekintése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('resume')
                .setDescription('Zene folytatása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Dal eltávolítása a listából')
                .addNumberOption(option => option.setName('number').setDescription('A dal sorszáma').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('seek')
                .setDescription('Ugrás a jelenleg lejátszott zenében')
                .addNumberOption(option => option.setName('time').setDescription('Az új időpont a dalban').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('shuffle')
                .setDescription('Lejátszási lista összekeverése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('skip')
                .setDescription('Jelenlegi dal kihagyása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('skipto')
                .setDescription('Ugrás egy másik dalra')
                .addNumberOption(option => option.setName('number').setDescription('A dal sorszáma').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stop')
                .setDescription('Zene leállítása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('volume')
                .setDescription('Zene hangerejének beállítása')
                .addNumberOption(option => option.setName('amount').setDescription('Az új hangerő értéke'))
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.checkBotPerms({
            flags: [Discord.PermissionsBitField.Flags.Connect, Discord.PermissionsBitField.Flags.Speak],
            perms: [Discord.PermissionsBitField.Flags.Connect, Discord.PermissionsBitField.Flags.Speak]
        }, interaction)

        client.loadSubcommands(client, interaction, args);
    },
};


 