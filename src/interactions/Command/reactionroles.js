const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('A szerver reakció szerepkörök kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a reactionroles kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Egy reakció szerepkör hozzáadása')
                .addStringOption(option => option.setName('category').setDescription('A reakció szerepkör csoport neve').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('Válassz egy szerepkört').setRequired(true))
                .addStringOption(option => option.setName('emoji').setDescription('Add meg az emojit').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Egy reakció szerepkör kategória törlése')
                .addStringOption(option => option.setName('category').setDescription('A reakció szerepkör csoport neve').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('A szerver összes reakció szerepkör kategóriájának megjelenítése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription('Az összes reakció szerepkör megjelenítése gombokkal')
                .addStringOption(option => option.setName('category').setDescription('A reakció szerepkör csoport neve').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('A csatorna, ahova a reakció szerepkörök kerüljenek').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('menu')
                .setDescription('Az összes reakció szerepkör megjelenítése egy menüben')
                .addStringOption(option => option.setName('category').setDescription('A reakció szerepkör csoport neve').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('A csatorna, ahova a reakció szerepkörök kerüljenek').addChannelTypes(ChannelType.GuildText))
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
            flags: [Discord.PermissionsBitField.Flags.ManageRoles],
            perms: [Discord.PermissionsBitField.Flags.ManageRoles]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 