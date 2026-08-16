const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('A bot beállítása az igényeidnek megfelelően')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Információ a config kategória parancsairól')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levels')
                .setDescription('A szintrendszer be- vagy kikapcsolása')
                .addBooleanOption(option => option.setName('boolean').setDescription('Válassz egy igen/nem értéket').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setcolor')
                .setDescription('Egyéni embed szín beállítása')
                .addStringOption(option => option.setName("color").setDescription("Add meg a hex színkódot").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setverify')
                .setDescription('A hitelesítő panel beállítása')
                .addBooleanOption(option => option.setName('enable').setDescription('Válassz egy igen/nem értéket').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Válassz egy csatornát').setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addRoleOption(option => option.setName('role').setDescription('Válassz egy szerepkört').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setchannelname')
                .setDescription('Egyéni csatornanév beállítása a szerverstatisztikákhoz')
                .addStringOption(option => option.setName("name").setDescription("Add meg a csatorna nevét, vagy küldj HELP-et a lehetőségekért").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levelmessage')
                .setDescription('A bot szintlépési üzenetének beállítása')
                .addStringOption(option => option.setName("message").setDescription("Add meg a szintlépési üzenetet, vagy küldj HELP-et a lehetőségekért").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomemessage')
                .setDescription('Az üdvözlő üzenet beállítása')
                .addStringOption(option => option.setName("message").setDescription("Add meg az üdvözlő üzenetet, vagy küldj HELP-et a lehetőségekért").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leavemessage')
                .setDescription('A kilépési üzenet beállítása')
                .addStringOption(option => option.setName("message").setDescription("Add meg a kilépési üzenetet, vagy küldj HELP-et a lehetőségekért").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketmessage')
                .setDescription('A bot ticket üzenetének beállítása')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('A ticket üzenet típusa')
                        .setRequired(true)
                        .addChoices(
                            { name: 'open', value: 'open' },
                            { name: 'closeDM', value: 'close' }
                        )
                )
                .addStringOption(option => option.setName("message").setDescription("Add meg a ticket üzenetét").setRequired(true))
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

 