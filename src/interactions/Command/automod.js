const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Az automata moderálás kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az automod kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antiinvite')
                .setDescription('A meghívó-szűrés be- vagy kikapcsolása')
                .addBooleanOption(option => option.setName('active').setDescription('Válassz egy igen/nem értéket').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antilinks')
                .setDescription('A link-szűrés be- vagy kikapcsolása')
                .addBooleanOption(option => option.setName('active').setDescription('Válassz egy igen/nem értéket').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antispam')
                .setDescription('A spamszűrés be- vagy kikapcsolása')
                .addBooleanOption(option => option.setName('active').setDescription('Válassz egy igen/nem értéket').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('linkschannel')
                .setDescription('Egy csatorna hozzáadása, ahol engedélyezettek a linkek')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Mit szeretnél tenni a csatornával?')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Hozzáadás', value: 'add' },
                            { name: 'Eltávolítás', value: 'remove' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommandGroup(group =>
            group
                .setName('blacklist')
                .setDescription('A feketelista kezelése')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('display')
                        .setDescription('A teljes feketelista megjelenítése')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('add')
                        .setDescription('Szó hozzáadása a feketelistához')
                        .addStringOption(option => option.setName('word').setDescription('A feketelistára kerülő szó').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('remove')
                        .setDescription('Szó eltávolítása a feketelistáról')
                        .addStringOption(option => option.setName('word').setDescription('A feketelistáról eltávolítandó szó').setRequired(true))
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
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 