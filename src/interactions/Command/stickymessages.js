const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stickymessages')
        .setDescription('A kitűzött üzenetek kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a stickymessages kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stick')
                .setDescription('Üzenet kitűzése egy csatornában')
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addStringOption(option => option.setName('message').setDescription('A kitűzött üzeneted').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('messages')
                .setDescription('A szervered összes kitűzött üzenetének megjelenítése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unstick')
                .setDescription('Egy kitűzött üzenet eltávolítása egy csatornából')
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').setRequired(true).addChannelTypes(ChannelType.GuildText))
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

 