const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Egy hiba vagy felhasználó bejelentése a fejlesztőknek')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('A bejelentés típusa')
                .setRequired(true)
                .addChoices(
                    { name: 'Hiba', value: 'bug' },
                    { name: 'Felhasználó', value: 'user' }
                )
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('A bejelentésed leírása')
                .setRequired(true)
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const webhookClient = new Discord.WebhookClient({
            id: client.webhooks.bugReportLogs.id,
            token: client.webhooks.bugReportLogs.token
        });

        const type = interaction.options.getString('type');
        const desc = interaction.options.getString('description');

        if (type == "bug") {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`📣・New bug report!`)
                .addFields(
                    { name: "Report category", value: "Bug", inline: true },
                    { name: "Submitted by", value: `${interaction.user.tag}`, inline: true },
                )
                .setDescription(`${desc}`)
                .setColor(client.config.colors.normal)
            webhookClient.send({
                username: 'Bot Reports',
                embeds: [embed],
            });

            client.succNormal({
                text: `Bug successfully sent to the developers!`,
                type: 'ephemeraledit'
            }, interaction);
        }
        else if (type == "user") {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`📣・New user report!`)
                .addFields(
                    { name: "Report category", value: "User", inline: true },
                    { name: "Submitted by", value: `${interaction.user.tag}`, inline: true },
                )
                .setDescription(`${desc}`)
                .setColor(client.config.colors.normal)
            webhookClient.send({
                username: 'Bot Reports',
                embeds: [embed],
            });

            client.succNormal({
                text: `User report successfully sent to the developers!`,
                type: 'ephemeraledit'
            }, interaction);
        }
    },
};

 