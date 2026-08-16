const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstats')
        .setDescription('A szerverstatisztikák kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a serverstats kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('boosts')
                .setDescription('A boostok számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tier')
                .setDescription('A boost szint nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channels')
                .setDescription('A csatornák számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stage-channels')
                .setDescription('A stage csatornák számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('text-channels')
                .setDescription('A szöveges csatornák számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('voice-channels')
                .setDescription('A hangcsatornák számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('news-channels')
                .setDescription('A hírcsatornák számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('members')
                .setDescription('A tagok számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bots')
                .setDescription('A botok számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roles')
                .setDescription('A szerepkörök számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emoji')
                .setDescription('Az emojik számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('static-emoji')
                .setDescription('A statikus emojik számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('animated-emoji')
                .setDescription('Az animált emojik számának nyomon követése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('time')
                .setDescription('Az aktuális időzónád nyomon követése')
                .addStringOption(option =>
                    option.setName('timezone')
                        .setDescription('A beállítani kívánt időzóna (pl. Europe/Amsterdam)')
                        .setRequired(true)
                )
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageChannels],
            perms: [Discord.PermissionsBitField.Flags.ManageChannels]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 