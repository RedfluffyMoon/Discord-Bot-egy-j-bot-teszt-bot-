const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const model = require('../../database/models/badge');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('developers')
        .setDescription('Parancsok a Bot fejlesztői számára')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a developers kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('eval')
                .setDescription('Egy kódrészlet eredményének lekérése')
                .addStringOption(option => option.setName('code').setDescription('A kódod').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('badge')
                .setDescription('A bot jelvényeinek kezelése')
                .addBooleanOption(option => option.setName('new').setDescription('Válassz egy igen/nem értéket').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addStringOption(option => option.setName('badge').setDescription('Válaszd ki a jelvényt').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('A bot tiltásainak kezelése')
                .addBooleanOption(option => option.setName('new').setDescription('Válassz egy igen/nem értéket').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('credits')
                .setDescription('A bot kreditjeinek kezelése')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('A kredit típusa')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Hozzáadás', value: 'add' },
                            { name: 'Eltávolítás', value: 'remove' }
                        )
                )
                .addUserOption(option => option.setName('user').setDescription('Válassz egy felhasználót').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('A kreditek mennyisége').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('args')
                .setDescription('Előre elkészített üzenetek küldése')
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('Válassz egy üzenetet')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Information', value: 'information' },
                            { name: 'Rules', value: 'rules' },
                            { name: 'Applications', value: 'applications' },
                            { name: 'Booster perks', value: 'boosterperks' },
                            { name: 'Links', value: 'links' },
                            { name: 'Rewards', value: 'rewards' },
                            { name: 'Our bots', value: 'ourbots' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('servers')
                .setDescription('Az ehhez a shardhoz tartozó összes szerver megtekintése')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        model.findOne({ User: interaction.user.id }, async (err, data) => {
            if (data && data.FLAGS.includes("DEVELOPER")) {
                await interaction.deferReply({ fetchReply: true });
                client.loadSubcommands(client, interaction, args);
            } else {
                return client.errNormal({
                    error: 'Only Bot developers are allowed to do this',
                    type: 'ephemeral'
                }, interaction)
            }
        })
    },
};

 