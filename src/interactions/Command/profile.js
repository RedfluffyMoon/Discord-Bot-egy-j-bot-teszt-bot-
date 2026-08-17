const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Profil létrehozása a szerverhez')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a profile kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Profilod létrehozása')
        ).addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Profilod törlése')
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('profile')
                .setDescription('Profil megtekintése')
                .addUserOption((option) =>
                    option.setName('user').setDescription('A felhasználó, akinek a profilját szeretnéd látni').setRequired(false),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('aboutme')
                .setDescription('A magadról szóló szöveg beállítása')
                .addStringOption(option => option.setName('text').setDescription('Add meg a magadról szóló szöveget').setRequired(true))
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('age')
                .setDescription('Korod beállítása')
                .addNumberOption(option => option.setName('number').setDescription('Add meg a számot').setRequired(true))
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('bday')
                .setDescription('Születésnapod beállítása')
                .addStringOption(option => option.setName('bday').setDescription('Add meg a születésnapodat').setRequired(true))
        )

        .addSubcommandGroup((group) =>
            group
                .setName('actor')
                .setDescription('Kedvenc színészed beállítása')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addactor')
                        .setDescription('A hozzáadni kívánt színész')
                        .addStringOption(option => option.setName('actor').setDescription('A hozzáadni kívánt színész').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delactor')
                        .setDescription("Az eltávolítani kívánt színész")
                        .addStringOption(option => option.setName('actor').setDescription('Az eltávolítani kívánt színész').setRequired(true)),
                )
        ).
        addSubcommandGroup((group) =>
            group
                .setName('artist')
                .setDescription('Kedvenc előadód beállítása')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addartist')
                        .setDescription('A hozzáadni kívánt előadó')
                        .addStringOption(option => option.setName('artist').setDescription('A hozzáadni kívánt előadó').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delartist')
                        .setDescription("Az eltávolítani kívánt előadó")
                        .addStringOption(option => option.setName('artist').setDescription('Az eltávolítani kívánt előadó').setRequired(true)),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('color')
                .setDescription('Kedvenc színed beállítása')
                .addStringOption(option => option.setName('color').setDescription('A beállítani kívánt szín').setRequired(true)),

        ).addSubcommandGroup((group) =>
            group
                .setName('food')
                .setDescription('Kedvenc ételed beállítása')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addfood')
                        .setDescription('A hozzáadni kívánt étel')
                        .addStringOption(option => option.setName('food').setDescription('A hozzáadni kívánt étel').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delfood')
                        .setDescription("Az eltávolítani kívánt étel")
                        .addStringOption(option => option.setName('food').setDescription('Az eltávolítani kívánt étel').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('movie')
                .setDescription('Kedvenc filmed beállítása')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addmovie')
                        .setDescription('A hozzáadni kívánt film')
                        .addStringOption(option => option.setName('movie').setDescription('A hozzáadni kívánt film').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delmovie')
                        .setDescription("Az eltávolítani kívánt film")
                        .addStringOption(option => option.setName('movie').setDescription('Az eltávolítani kívánt film').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('pet')
                .setDescription('Kedvenc állatod beállítása')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addpet')
                        .setDescription('A hozzáadni kívánt állat')
                        .addStringOption(option => option.setName('pet').setDescription('A hozzáadni kívánt állat').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delpet')
                        .setDescription("Az eltávolítani kívánt állat")
                        .addStringOption(option => option.setName('pet').setDescription('Az eltávolítani kívánt állat').setRequired(true)),
                )
        ).addSubcommandGroup((group) =>
            group
                .setName('song')
                .setDescription('Kedvenc dalod beállítása')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addsong')
                        .setDescription('A hozzáadni kívánt dal')
                        .addStringOption(option => option.setName('song').setDescription('A hozzáadni kívánt dal').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delsong')
                        .setDescription("Az eltávolítani kívánt dal")
                        .addStringOption(option => option.setName('song').setDescription('Az eltávolítani kívánt dal').setRequired(true)),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('gender')
                .setDescription('Nemed beállítása')

        ).addSubcommandGroup((group) =>
            group
                .setName('hobbies')
                .setDescription('Kedvenc hobbid beállítása')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('addhobby')
                        .setDescription('A hozzáadni kívánt hobbi')
                        .addStringOption(option => option.setName('hobby').setDescription('A hozzáadni kívánt hobbi').setRequired(true)),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('delhobby')
                        .setDescription("Az eltávolítani kívánt hobbi")
                        .addStringOption(option => option.setName('hobby').setDescription('Az eltávolítani kívánt hobbi').setRequired(true)),
                )
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('origin')
                .setDescription('Származási helyed beállítása')
                .addStringOption(option => option.setName('country').setDescription('Add meg az országot').setRequired(true))
        ).
        addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Státuszod beállítása')
                .addStringOption(option => option.setName('text').setDescription('Add meg a státuszt').setRequired(true))
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

 