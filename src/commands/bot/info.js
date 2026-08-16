const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [nap], \`H\` [óra], \`m\` [perc], \`s\` [mp]");

            client.embed({
                title: `ℹ・Bot információ`,
                desc: `____________________________`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
               {
                    name: "ℹ️┆Információ",
                    value: `A Bot egy olyan bot, amellyel az egész szerveredet üzemeltetheted! Nem kevesebb, mint 350+ paranccsal egy nagy botot kínálunk, sok lehetőséggel a szervered fejlesztéséhez!`,
                    inline: false,
                },
                {
                    name: "_____ \n\n│Általános",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "🤖┆Bot neve",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "🆔┆Bot azonosító",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "💻┆Shardok",
                    value: `\`${client.options.shardCount}\` shard`,
                    inline: true,
                },
                {
                    name: "🔧┆Bot tulajdonosa",
                    value: `<@!755297485328482356> `,
                    inline: true,
                },
                {
                    name: "🔧┆Bot fejlesztője",
                    value: `<@!755297485328482356> <@!884553151666061372>`,
                    inline: true,
                },
                {
                    name: "💻┆Parancsok",
                    value: `\`${client.commands.size}\` parancs`,
                    inline: true,
                },
                {
                    name: "🌐┆Szerverek",
                    value: `\`${totalGuilds}\` szerver`,
                    inline: true,
                },
                {
                    name: "🌐┆Szerverek ezen a shardon",
                    value: `\`${client.guilds.cache.size}\` szerver`,
                    inline: true,
                },
                {
                    name: "👥┆Tagok",
                    value: `\`${totalMembers}\` tag`,
                    inline: true,
                },
                {
                    name: "🔊┆Csatlakoztatott csatornák",
                    value: `\`${totalVoice}\` csatorna`,
                    inline: true,
                },
                {
                    name: "📺┆Csatornák",
                    value: `\`${totalChannels}\` csatorna`,
                    inline: true,
                },
                {
                    name: "📅┆Létrehozva",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "_____ \n\n│Rendszer",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "🆙┆Üzemidő",
                    value: `${duration}`,
                    inline: true,
                },
                {
                    name: "⌛┆API sebesség:",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "🏷┆Bot verzió",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "🏷┆Node.js verzió",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "📂┆Discord.js verzió",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "💾┆Bot memória",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
                    inline: true,
                },
                {
                    name: "🔗┆Linkek",
                    value: `Meghívás: [[ITT]](${client.config.discord.botInvite}) \nTámogatói szerver: [[ITT]](${client.config.discord.serverInvite})`,
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}

 
