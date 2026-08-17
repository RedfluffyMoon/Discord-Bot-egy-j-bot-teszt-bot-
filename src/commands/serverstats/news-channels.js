const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    var channelName = await client.getTemplate(interaction.guild);
    channelName = channelName.replace(`{emoji}`, "📢")
    channelName = channelName.replace(`{name}`, `Hírcsatornák: ${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildAnnouncement).size || 0}`)

    await interaction.guild.channels.create({
        name: channelName,
        type:  Discord.ChannelType.GuildVoice, permissionOverwrites: [
            {
                deny: [Discord.PermissionsBitField.Flags.Connect],
                id: interaction.guild.id
            },
        ],
    }).then(async (channel) => {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.NewsChannels = channel.id;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    NewsChannels: channel.id
                }).save();
            }
        })
        
        client.succNormal({
            text: `Hírcsatorna számláló létrehozva!`,
            fields: [
                {
                    name: `📘┆Csatorna`,
                    value: `${channel}`
                }
            ],
            type: 'editreply'
        }, interaction);
    })

}

 