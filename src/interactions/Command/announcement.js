const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('A szerver bejelentéseinek kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az announcement kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Bejelentés készítése')
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').setRequired(true).addChannelTypes(ChannelType.GuildText).addChannelTypes(ChannelType.GuildNews))
                .addStringOption(option => option.setName('message').setDescription('A bejelentésed szövege').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Egy bejelentés szerkesztése')
                .addStringOption(option => option.setName('id').setDescription('A módosítani kívánt bejelentés azonosítója').setRequired(true))
                .addStringOption(option => option.setName('message').setDescription('A bejelentésed szövege').setRequired(true)),
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 