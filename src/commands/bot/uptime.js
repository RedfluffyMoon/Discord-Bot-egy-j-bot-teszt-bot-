const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const duration = moment.duration(client.uptime).format("\`D\` [nap], \`H\` [óra], \`m\` [perc], \`s\` [mp]");
    const upvalue = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

    client.embed({
        title: `${client.emotes.normal.arrowUp}・Üzemidő`,
        desc: `Nézd meg a Bot üzemidejét`,
        fields: [
            {
                name: "⌛┇Üzemidő",
                value: `${duration}`,
                inline: true
            },
            {
                name: "⏰┇Elindulva",
                value: `<t:${upvalue}>`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)
}

 