const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('custom-commands')
        .setDescription('Egyéni parancsok létrehozása')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ az egyéni parancsok kategóriáról'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Egyéni parancs létrehozása')
                .addStringOption(option => option.setName('command').setDescription('A parancs neve').setRequired(true))
                .addStringOption(option => option.setName('text').setDescription('A parancs válasza').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Egyéni parancs törlése')
                .addStringOption(option => option.setName('command').setDescription('A parancs neve').setRequired(true)),
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

 