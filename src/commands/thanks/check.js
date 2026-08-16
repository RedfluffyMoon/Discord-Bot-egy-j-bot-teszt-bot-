const Discord = require('discord.js');
const thanksSchema = require("../../database/models/thanks");

module.exports = async (client, interaction, args) => {

    const member = interaction.options.getUser('user');

    thanksSchema.findOne({ User: member.id }, async (err, data) => {
        if (data) {

            return client.embed({ title: `🤝・Köszönetek`, desc: `**${member.tag}** felhasználónak \`${data.Received}\` köszönete van`, type: 'editreply' }, interaction);

        }
        else {

            return client.embed({ title: `🤝・Köszönetek`, desc: `**${member.tag}** felhasználónak \`0\` köszönete van`, type: 'editreply' }, interaction);
        }
    });

}

 