const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('radio')
        .setDescription('Rádió hallgatása a Botban')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a radio kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Rádió indítása'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stop')
                .setDescription('Rádió leállítása'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('playing')
                .setDescription('Megmutatja, mi szól most'),
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.checkBotPerms({
            flags: [Discord.PermissionsBitField.Flags.Connect, Discord.PermissionsBitField.Flags.Speak],
            perms: [Discord.PermissionsBitField.Flags.Connect, Discord.PermissionsBitField.Flags.Speak]
        }, interaction)
        if (!interaction.member.voice.channel) return client.errNormal({ 
            error: `You're not in a voice channel!`, 
            type: 'editreply' 
        }, interaction);

        client.loadSubcommands(client, interaction, args);
    },
};

 