const Discord = require('discord.js');
const sourcebin = require('sourcebin');

module.exports = async (client, interaction, args) => {

    const language = interaction.options.getString('language');
    const code = interaction.options.getString('code');

    const bin = await sourcebin.create(
        [
            {
                content: `${code}`,
                language: `${language}`,
            },
        ],
        {
            title: '💻・Véletlenszerű kód',
            description: 'Ezt a kódot a Bot töltötte fel',
        },
    ).then(value => {
        client.succNormal({
            text: `A kódod közzétéve!`,
            fields: [
                {
                    name: `🔗┇Link`,
                    value: `[Kattints ide a kódod megtekintéséhez](${value.url})`,
                    inline: true,
                }
            ],
            type: 'editreply'
        }, interaction);
    })

}

 