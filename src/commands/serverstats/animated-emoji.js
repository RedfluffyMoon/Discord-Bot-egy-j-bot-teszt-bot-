const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    interaction.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++;
        if (emoji.animated) {
            Animated++;
        } else {
            EmojiCount++;
        }
    });

    var channelName = await client.getTemplate(interaction.guild);
    channelName = channelName.replace(`{emoji}`, "🤡")
    channelName = channelName.replace(`{name}`, `Animált Emojik: ${Animated || '0'}`)

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
                data.AnimatedEmojis = channel.id;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    AnimatedEmojis: channel.id
                }).save();
            }
        })

        client.succNormal({
            text: `Animált emoji számláló létrehozva!`,
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

 