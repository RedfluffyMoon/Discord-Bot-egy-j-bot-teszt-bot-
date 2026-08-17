const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('A Bot beállításainak kezelése')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a setup kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tickets')
                .setDescription('A ticketrendszer beállítása')
                .addChannelOption(option => option.setName('category').setDescription('Válaszd ki a kategóriát, ahova a ticketek kerüljenek').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addRoleOption(option => option.setName('role').setDescription('Válaszd ki a támogatói szerepkört').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('A ticket panel csatornája').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addChannelOption(option => option.setName('logs').setDescription('A ticket naplók csatornája').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Az egyéni hangcsatornák beállítása')
                .addChannelOption(option => option.setName('category').setDescription('Válaszd ki a kategóriát, ahova a csatornák kerüljenek').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addStringOption(option => option.setName('channelname').setDescription('A csatornanevek sablonja').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('logs')
                .setDescription('A szerver naplózásának beállítása')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('A kívánt beállítás')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Szerver naplók', value: 'serverLogs' },
                            { name: 'Szint naplók', value: 'levelLogs' },
                            { name: 'Boost naplók', value: 'boostLogs' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('A naplózás csatornája').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fun')
                .setDescription('A szerver szórakoztató csatornáinak beállítása')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('A kívánt beállítás')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Születésnapok', value: 'birthdays' },
                            { name: 'Chatbot', value: 'chatbot' },
                            { name: 'Vélemények', value: 'reviews' },
                            { name: 'Javaslatok', value: 'suggestions' },
                            { name: 'Starboard', value: 'starboard' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('A szórakoztató funkció csatornája').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('A szerver játék csatornáinak beállítása')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('A kívánt beállítás')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Számolás', value: 'counting' },
                            { name: 'Találd ki a számot', value: 'gtn' },
                            { name: 'Találd ki a szót', value: 'gtw' },
                            { name: 'Szó kígyó', value: 'wordsnake' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('A játék csatornája').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomechannels')
                .setDescription('Az üdvözlő csatornák beállítása')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('A kívánt beállítás')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Üdvözlő csatorna', value: 'welcomechannel' },
                            { name: 'Kilépési csatorna', value: 'leavechannel' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('A kívánt csatorna').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomerole')
                .setDescription('Az üdvözlő szerepkör beállítása')
                .addRoleOption(option => option.setName('role').setDescription('A kívánt szerepkör').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('A ticket panel beállítása')
                .addStringOption(option => option.setName('name').setDescription('A ticket panel neve').setRequired(true))
                .addStringOption(option => option.setName('description').setDescription('A ticket panel leírása').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deletesetup')
                .setDescription('Egy Bot beállítás törlése')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('A kívánt beállítás')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Ticketek', value: 'tickets' },
                            { name: 'Egyéni hangcsatorna', value: 'customvoice' },
                            { name: 'Szerver naplók', value: 'serverlogs' },
                            { name: 'Szint naplók', value: 'levellogs' },
                            { name: 'Boost naplók', value: 'boostlogs' },
                            { name: 'Születésnapok', value: 'birthdays' },
                            { name: 'Chatbot', value: 'chatbot' },
                            { name: 'Vélemények', value: 'reviews' },
                            { name: 'Javaslatok', value: 'suggestions' },
                            { name: 'Számolás', value: 'counting' },
                            { name: 'Találd ki a számot', value: 'gtn' },
                            { name: 'Találd ki a szót', value: 'gtw' },
                            { name: 'Üdvözlő csatorna', value: 'welcomechannel' },
                            { name: 'Kilépési csatorna', value: 'leavechannel' },
                            { name: 'Üdvözlő szerepkör', value: 'welcomerole' },
                            { name: 'Szó kígyó', value: 'wordsnake' }
                        )
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
            flags: [Discord.PermissionsBitField.Flags.Administrator],
            perms: [Discord.PermissionsBitField.Flags.Administrator]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 