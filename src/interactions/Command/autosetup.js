const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autosetup')
        .setDescription('A bot automatikus beállítása')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az autosetup parancsokról')
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcome')
                .setDescription('Az üdvözlő rendszer beállítása')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('A kívánt beállítás')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Üdvözlő csatorna', value: 'welcomechannel' },
                            { name: 'Üdvözlő szerepkör', value: 'welcomerole' },
                            { name: 'Kilépési csatorna', value: 'leavechannel' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('A szerver egyéni hangcsatornáinak beállítása')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('A szerver ticket paneljének beállítása')
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

 