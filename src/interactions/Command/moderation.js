const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('A szerver moderálásának kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a moderation kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Egy felhasználó kitiltása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('A kitiltás indoka'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Üzenetek törlése')
                .addNumberOption(option => option.setName('amount').setDescription('Az üzenetek száma').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clearuser')
                .setDescription('Egy felhasználó üzeneteinek törlése egy csatornában')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('demote')
                .setDescription('Egy felhasználó lefokozása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('Egy felhasználó kirúgása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('A kirúgás indoka'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lock')
                .setDescription('Egy csatorna lezárása')
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lockdown')
                .setDescription('Az összes csatorna lezárása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('nuke')
                .setDescription('Egy csatorna kiürítése (nuke)')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('softban')
                .setDescription('Egy felhasználó softban-elése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('A kitiltás indoka'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('timeout')
                .setDescription('Egy felhasználó időzítése (timeout)')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('time').setDescription('A percek száma').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('A timeout indoka').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tempban')
                .setDescription('Egy felhasználó ideiglenes kitiltása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('time').setDescription('A percek száma').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('A kitiltás indoka'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unlock')
                .setDescription('Egy csatorna feloldása')
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unban')
                .setDescription('Egy felhasználó kitiltásának visszavonása')
                .addStringOption(option => option.setName('user').setDescription('Add meg a felhasználó azonosítóját').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('banlist')
                .setDescription('Az összes kitiltott felhasználó lekérése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('warn')
                .setDescription('Egy felhasználó figyelmeztetése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('A figyelmeztetés indoka').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unwarn')
                .setDescription('Egy felhasználó figyelmeztetésének visszavonása')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addIntegerOption(option => option.setName('case').setDescription('Add meg az eset számát').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('warnings')
                .setDescription('Egy felhasználó figyelmeztetéseinek megtekintése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
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

 