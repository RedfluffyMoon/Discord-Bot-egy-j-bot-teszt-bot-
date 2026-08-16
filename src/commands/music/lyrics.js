const Discord = require('discord.js');
const lyricsFinder = require("lyrics-finder");

module.exports = async (client, interaction, args) => {
    let search = "";

        const player = client.player.players.get(interaction.guild.id);

        const channel = interaction.member.voice.channel;
        if (!channel) return client.errNormal({
            error: `Nem vagy hangcsatornában!`,
            type: 'editreply'
        }, interaction);

        if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
            error: `Nem vagy ugyanabban a hangcsatornában!`,
            type: 'editreply'
        }, interaction);

        if (!player || !player.queue.current) return client.errNormal({
            error: "Nincs lejátszott zene ezen a szerveren",
            type: 'editreply'
        }, interaction);

        if (!interaction.options.getString('song')) {
            search = player.queue.current.title;
        }
        else {
            search = interaction.options.getString('song');
        }

        let lyrics = "";

        try {
            lyrics = await lyricsFinder(search, "");
            if (!lyrics) lyrics = `Nem található dalszöveg ehhez: ${search} :x:`;
        } catch (error) {
            lyrics = `Nem található dalszöveg ehhez: ${search} :x:`;
        }

        client.embed({
            title: `${client.emotes.normal.music}・Dalszöveg - ${search}`,
            desc: lyrics,
            type: 'editreply'
        }, interaction)
}

 