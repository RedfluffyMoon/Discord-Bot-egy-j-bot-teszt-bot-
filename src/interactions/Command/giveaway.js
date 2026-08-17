const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Nyereményjáték indítása a szerveredben')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a giveaway kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Nyereményjáték indítása')
                .addChannelOption(option => option.setName('channel').setDescription('A csatorna, ahova a nyereményjáték kerüljön').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
                .addStringOption(option => option.setName('duration').setDescription('A nyereményjáték időtartama').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('A nyertesek száma').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('A nyeremény').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('drop')
                .setDescription('Drop nyereményjáték indítása')
                .addChannelOption(option => option.setName('channel').setDescription('A csatorna, ahova a nyereményjáték kerüljön').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
                .addStringOption(option => option.setName('duration').setDescription('A nyereményjáték időtartama').setRequired(true))
                .addNumberOption(option => option.setName('winners').setDescription('A nyertesek száma').setRequired(true))
                .addStringOption(option => option.setName('prize').setDescription('A nyeremény').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reroll')
                .setDescription('Egy nyereményjáték újrasorsolása')
                .addStringOption(option => option.setName('message').setDescription('A nyereményjáték üzenetének azonosítója').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('end')
                .setDescription('Egy nyereményjáték befejezése')
                .addStringOption(option => option.setName('message').setDescription('A nyereményjáték üzenetének azonosítója').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Egy nyereményjáték idejének szerkesztése')
                .addStringOption(option => option.setName('message').setDescription('A nyereményjáték üzenetének azonosítója').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Egy nyereményjáték törlése')
                .addStringOption(option => option.setName('message').setDescription('A nyereményjáték üzenetének azonosítója').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Egy nyereményjáték szüneteltetése')
                .addStringOption(option => option.setName('message').setDescription('A nyereményjáték üzenetének azonosítója').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unpause')
                .setDescription('Egy nyereményjáték folytatása')
                .addStringOption(option => option.setName('message').setDescription('A nyereményjáték üzenetének azonosítója').setRequired(true)),
        ),

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

 