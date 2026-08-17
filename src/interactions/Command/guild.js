const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild')
        .setDescription('A szerver kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a guild kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channelinfo')
                .setDescription('Információ egy csatornáról')
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('members')
                .setDescription('Megnézheted, hány tagja van a szervernek')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('oldestmember')
                .setDescription('A szerver legrégebben regisztrált tagjának lekérése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roleinfo')
                .setDescription('Információ egy szerepkörről')
                .addRoleOption(option => option.setName('role').setDescription('Válassz egy szerepkört').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Minden információ a jelenlegi szerverről')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stealemoji')
                .setDescription('Egy emoji ellopása')
                .addStringOption(option => option.setName('emoji').setDescription('Add meg az ellopni kívánt emojit').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Válassz egy szerepkört').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('youngestmember')
                .setDescription('A szerver legfrissebben regisztrált tagjának lekérése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('userinfo')
                .setDescription('Minden információ egy felhasználóról')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('inviteinfo')
                .setDescription('Minden információ egy meghívóról')
                .addStringOption(option => option.setName('invite').setDescription('Add meg a meghívókódot').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojis')
                .setDescription('A szerver emojijainak megtekintése')
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

 