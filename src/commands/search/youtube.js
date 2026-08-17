const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    let name = encodeURIComponent(interaction.options.getString('name'));
    let link = `https://www.youtube.com/results?search_query=${name}`;

    client.succNormal({
        text: `Ezt találtam erre: \`${name}\``,
        fields: [
            {
                name: `🔗┇Link`,
                value: `[Kattints ide a link megtekintéséhez](${link})`,
                inline: true,
            }
        ], type: 'editreply'
    }, interaction);

}

 