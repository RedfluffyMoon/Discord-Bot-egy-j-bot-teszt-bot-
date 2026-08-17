const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {

    // Meme Images

    data: new SlashCommandBuilder()
        .setName('images')
        .setDescription('A Bot összes képének megtekintése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az images kategória parancsairól')
        )
        .addSubcommandGroup((group) =>
            group
                .setName('memes')
                .setDescription('A Bot összes meme-jének megtekintése')
                .addSubcommand((subcommand) =>
                    subcommand.setName('clyde').setDescription('Egyéni Clyde üzenet létrehozása')
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))

                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('drake').setDescription('Drake meme létrehozása')
                        .addStringOption(option => option.setName('text1').setDescription('Add meg a szöveget').setRequired(true))
                        .addStringOption(option => option.setName('text2').setDescription('Add meg a szöveget').setRequired(true)),

                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('meme').setDescription('Egy véletlenszerű meme lekérése'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('pooh').setDescription('Micimackó meme létrehozása')
                        .addStringOption(option => option.setName('text1').setDescription('Add meg a szöveget').setRequired(true))
                        .addStringOption(option => option.setName('text2').setDescription('Add meg a szöveget').setRequired(true)),

                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('trumptweet').setDescription('Egyéni Donald Trump tweet megjelenítése a megadott üzenettel')
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('tweet').setDescription('Egy tweet létrehozása')
                        .addStringOption(option => option.setName('text').setDescription('Add meg a szöveget').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('wasted').setDescription('GTA wasted átfedés'),
                )

        )

        // Animal Images

        .addSubcommandGroup((group) =>
            group
                .setName('animals')
                .setDescription('A Bot összes állatos képének megtekintése')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('bird')
                        .setDescription('Egy véletlenszerű madárkép lekérése'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('cat')
                        .setDescription("Egy véletlenszerű macskakép lekérése")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('dog')
                        .setDescription("Egy véletlenszerű kutyakép lekérése")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('fox')
                        .setDescription("Egy véletlenszerű rókakép lekérése")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('koala')
                        .setDescription("Egy véletlenszerű koalakép lekérése")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('panda')
                        .setDescription("Egy véletlenszerű pandakép lekérése")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('redpanda')
                        .setDescription("Egy véletlenszerű vörös panda kép lekérése")
                )
        )

        // User Images

        .addSubcommandGroup((group) =>
            group
                .setName('user')
                .setDescription('A Bot összes felhasználós képének megtekintése')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('ad')
                        .setDescription('Reklámkép generálása')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akiről a reklámot szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('avatar')
                        .setDescription('Egy felhasználó avatarjának megtekintése')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akinek az avatarját szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('banner')
                        .setDescription('Egy felhasználó bannerének megtekintése')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akinek a bannerét szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('bed')
                        .setDescription('Ágy meme létrehozása')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akivel aludni szeretnél').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('blur')
                        .setDescription('Elmosott kép készítése')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akiről az elmosott képet szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('burn')
                        .setDescription('Égő kép készítése')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akiről az égő képet szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('clown')
                        .setDescription('Bohóckép generálása')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akit bohóccá szeretnél tenni').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('colorify')
                        .setDescription('Színezett kép generálása')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akiről a színezett képet szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('darkness')
                        .setDescription('Sötétített kép készítése')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akiről a sötétített képet szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('facepalm')
                        .setDescription('Facepalm kép generálása')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akiről a facepalm képet szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('greyscale')
                        .setDescription('Egy kép szürkeárnyalatossá tétele')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akit szürkeárnyalatossá szeretnél tenni').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('invert')
                        .setDescription('Egy kép színeinek invertálása')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akiről az invertált képet szeretnéd').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('kiss')
                        .setDescription('Egy felhasználó megcsókolása')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akit meg szeretnél csókolni').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('podium')
                        .setDescription('Felhasználói dobogó készítése')
                        .addUserOption((option) =>
                            option.setName('user1').setDescription('A dobogó első helyezettje').setRequired(true),
                        )
                        .addUserOption((option) =>
                            option.setName('user2').setDescription('A dobogó második helyezettje').setRequired(true),
                        )
                        .addUserOption((option) =>
                            option.setName('user3').setDescription('A dobogó harmadik helyezettje').setRequired(true),
                        )

                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('spank')
                        .setDescription('Egy felhasználó elfenekelése')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akit el szeretnél fenekelni').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wanted')
                        .setDescription('Körözési plakát készítése egy felhasználóról')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('A felhasználó, akit körözni szeretnél').setRequired(true),
                        )
                )
        )

        // Extra Images

        .addSubcommandGroup((group) =>
            group
                .setName('extra')
                .setDescription('A Bot összes egyéb képének megtekintése')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('car')
                        .setDescription('Egy véletlenszerű autókép lekérése'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('glass')
                        .setDescription('Üvegtextúra ráhelyezése egy képre'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('image').setDescription('Egy kép megjelenítése embedben')
                        .addChannelOption(option => option.setName('channel').setDescription('A csatorna, ahova az embed kerüljön').setRequired(true).addChannelTypes(ChannelType.GuildText))
                        .addStringOption(option => option.setName('image-url').setDescription('Add meg a kép URL-jét').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('triggered')
                        .setDescription('Trigger effektus magadról'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('wallpaper').setDescription('Egy háttérkép visszaadása a HDQWalls-ról')
                        .addStringOption(option => option.setName('name').setDescription('Add meg a nevet').setRequired(true))
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


 