const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy')
        .setDescription('A gazdasági rendszer használata a szervereden')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az economy kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('additem')
                .setDescription('Egy szerepkör-tétel hozzáadása a gazdasági bolthoz')
                .addRoleOption(option => option.setName('role').setDescription('Válassz egy szerepkört').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('addmoney')
                .setDescription('Pénz hozzáadása egy felhasználóhoz')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('balance')
                .setDescription('Egyenleged megtekintése')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('beg')
                .setDescription('Kéregess pénzért')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('buy')
                .setDescription('Tételek vásárlása a Bot boltjában')

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('A gazdasági adatok törlése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crime')
                .setDescription('Kövess el egy bűncselekményt')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('daily')
                .setDescription('Napi pénzed felvétele')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deleteitem')
                .setDescription('Egy szerepkör-tétel törlése a gazdasági boltból')
                .addRoleOption(option => option.setName('role').setDescription('Válassz egy szerepkört').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deposit')
                .setDescription('Pénz befizetése a bankba')
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fish')
                .setDescription('Menj halászni')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hourly')
                .setDescription('Óránkénti pénzed felvétele')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hunt')
                .setDescription('Menj vadászni')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('monthly')
                .setDescription('Havi pénzed felvétele')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pay')
                .setDescription('Fizess egy felhasználónak')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('present')
                .setDescription('Heti ajándékod átvétele')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('removemoney')
                .setDescription('Pénz elvétele egy felhasználótól')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('rob')
                .setDescription('Rabolj ki egy felhasználót')
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('store')
                .setDescription('A szerver boltjának megjelenítése')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weekly')
                .setDescription('Heti pénzed felvétele')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('withdraw')
                .setDescription('Pénzed kivétele a bankból')
                .addNumberOption(option => option.setName('amount').setDescription('Add meg az összeget').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('work')
                .setDescription('Menj dolgozni')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('yearly')
                .setDescription('Éves pénzed felvétele')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('A gazdasági toplista megtekintése')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('A kívánt toplista típusa')
                        .setRequired(true)
                        .addChoices(
                            {name: 'Pénz', value: 'money'},
                            {name: 'Bank', value: 'bank'}
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
        client.loadSubcommands(client, interaction, args);
    },
};

 