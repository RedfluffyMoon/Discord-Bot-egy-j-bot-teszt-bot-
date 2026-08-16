
module.exports = async (client, interaction, args) => {

    const image = interaction.options.getString('image-url');
    const channel = interaction.options.getChannel('channel');

    if (!channel) return client.errNormal({ error: `Csatorna nem található`, type: 'editreply' }, interaction)

    client.succNormal({
        text: `A kép sikeresen elküldve ide: ${channel}`,
        type: 'editreply'
    }, interaction)

    client.simpleEmbed({
        image: `${image}`
    }, channel)
}

 