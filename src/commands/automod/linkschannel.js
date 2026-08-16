const Discord = require('discord.js');

const Schema = require('../../database/models/channelList');

module.exports = async (client, interaction, args) => {
    const type = interaction.options.getString('type');
    const channel = interaction.options.getChannel('channel');

    if (type == "add") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                if (data.Channels.includes(channel.id)) {
                    return client.errNormal({
                        error: `A(z) ${channel} csatorna már szerepel az adatbázisban!`,
                        type: 'editreply'
                    }, interaction);
                }

                data.Channels.push(channel.id);
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Channels: channel.id
                }).save();
            }
        })

        client.succNormal({
            text: `A csatorna hozzáadva a fehérlistához!`,
            fields: [
                {
                    name: `📘┆Csatorna`,
                    value: `${channel} (${channel.name})`
                }
            ],
            type: 'editreply'
        }, interaction);
    }
    else if (type == "remove") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                if (!data.Channels.includes(channel.id)) {
                    return client.errNormal({
                        error: `A(z) ${channel} csatorna nem szerepel az adatbázisban!`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Channels.filter((target) => target !== channel.id);

                await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, {
                    Guild: interaction.guild.id,
                    Channels: filtered
                });


                client.succNormal({
                    text: `A csatorna eltávolítva a fehérlistáról!`,
                    fields: [
                        {
                            name: `📘┆Csatorna`,
                            value: `${channel} (${channel.name})`
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            }
            else {
                return client.errNormal({
                    error: `Ehhez a szerverhez nincs adat!`,
                    type: 'editreply'
                }, interaction);
            }
        })
    }
}

 