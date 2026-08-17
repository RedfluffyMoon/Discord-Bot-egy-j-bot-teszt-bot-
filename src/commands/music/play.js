const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    if (!interaction.member.voice.channel) return client.errNormal({
        error: `Nem vagy hangcsatornában!`,
        type: 'editreply'
    }, interaction);

    let channel = interaction.member.voice ? interaction.member.voice.channel : null;
    if (!channel) return client.errNormal({
        error: `A csatorna nem létezik!`,
        type: 'editreply'
    }, interaction);

    let player = client.player.players.get(interaction.guild.id);

    if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
        error: `Nem vagy ugyanabban a hangcsatornában!`,
        type: 'editreply'
    }, interaction);

    if (!player) {
        player = client.player.create({
            guild: interaction.guild.id,
            voiceChannel: channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true
        });

        if (!channel.joinable) return client.errNormal({
            error: `Ahhoz a csatornához nem tudok csatlakozni`,
            type: 'editreply'
        }, interaction);
        player.connect()

        setTimeout(() => {
            if (channel.type == Discord.ChannelType.GuildStageVoice) {
                interaction.guild.members.me.voice.setSuppressed(false);
            }
        }, 500)
    }

    player = client.player.players.get(interaction.guild.id);
    if (player.state !== "CONNECTED") player.connect();

    var query = interaction.options.getString('song');

    client.simpleEmbed({
        desc: `🔎┆Keresés...`,
        type: 'editreply'
    }, interaction)

    const res = await player.search(query, interaction.user);

    if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        return client.errNormal({
            error: `Hiba történt a zene lekérése közben. Próbáld újra pár perc múlva`,
            type: 'editreply'
        }, interaction);
    }

    switch (res.loadType) {
        case 'NO_MATCHES': {
            if (!player.queue.current) player.destroy()
            await client.errNormal({
                error: `Nem található zene`,
                type: 'editreply'
            }, interaction);
            break;
        }

        case 'TRACK_LOADED': {
            const track = res.tracks[0];
            await player.queue.add(track);

            if (!player.playing && !player.paused) {
                player.play();
            }
            else {
                client.embed({
                    title: `${client.emotes.normal.music}・${track.title}`,
                    url: track.uri,
                    desc: `A szám hozzá lett adva a lejátszási listához!`,
                    thumbnail: track.thumbnail,
                    fields: [
                        {
                            name: `👤┆Kérte`,
                            value: `${track.requester}`,
                            inline: true
                        },
                        {
                            name: `${client.emotes.normal.clock}┆Vége`,
                            value: `<t:${((Date.now() / 1000) + (track.duration / 1000)).toFixed(0)}:f>`,
                            inline: true
                        },
                        {
                            name: `🎬┆Előadó`,
                            value: `${track.author}`,
                            inline: true
                        }
                    ],
                    type: 'editreply'
                }, interaction)
            }
            break;
        }

        case 'PLAYLIST_LOADED': {
            await player.queue.add(res.tracks);
            if (!player.playing && !player.paused) player.play()
            else {

            }
            break;
        }

        case 'SEARCH_RESULT': {
            let max = 5, collected, filter = (i) => i.user.id === interaction.user.id;
            if (res.tracks.length < max) max = res.tracks.length;

            let row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("1️⃣")
                        .setCustomId("1")
                        .setStyle(Discord.ButtonStyle.Secondary),

                    new Discord.ButtonBuilder()
                        .setEmoji("2️⃣")
                        .setCustomId("2")
                        .setStyle(Discord.ButtonStyle.Secondary),

                    new Discord.ButtonBuilder()
                        .setEmoji("3️⃣")
                        .setCustomId("3")
                        .setStyle(Discord.ButtonStyle.Secondary),

                    new Discord.ButtonBuilder()
                        .setEmoji("4️⃣")
                        .setCustomId("4")
                        .setStyle(Discord.ButtonStyle.Secondary),

                    new Discord.ButtonBuilder()
                        .setEmoji("5️⃣")
                        .setCustomId("5")
                        .setStyle(Discord.ButtonStyle.Secondary),
                );

            let row2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("🛑")
                        .setLabel("Mégse")
                        .setCustomId("cancel")
                        .setStyle(Discord.ButtonStyle.Danger),
                );

            const results = res.tracks
                .slice(0, max)
                .map((track, index) => `**[#${++index}]**┆${track.title.length >= 45 ? `${track.title.slice(0, 45)}...` : track.title}`)
                .join('\n');

            client.embed({
                title: `🔍・Keresési találatok`,
                desc: results,
                fields: [
                    {
                        name: `❓┆Mégsem keresel?`,
                        value: `Nyomd meg a \`cancel\` gombot a keresés leállításához`,
                        inline: true
                    }
                ],
                components: [row, row2],
                type: 'editreply'
            }, interaction)

            try {
                i = await interaction.channel.awaitMessageComponent({ filter, max: 1, time: 30e3, componentType: Discord.ComponentType.Button, errors: ['time'] });
            } catch (e) {
                if (!player.queue.current) player.destroy();
                row.components.forEach((button) => button.setDisabled(true));
                row2.components.forEach((button) => button.setDisabled(true));
                return client.errNormal({
                    error: `Nem választottál semmit`,
                    type: 'editreply',
                    components: [row, row2]
                }, interaction)
            }

            const first = i.customId;
            i.message.delete();
            i.deferUpdate();

            if (first.toLowerCase() === 'cancel') {
                if (!player.queue.current) player.destroy();
                return interaction.channel.send('Kiválasztás megszakítva.');
            }

            const index = Number(first) - 1;
            if (index < 0 || index > max - 1) return client.errNormal({
                error: `A megadott szám túl kicsi vagy túl nagy (1-${max})`,
                type: 'editreply'
            }, interaction)

            const track = res.tracks[index];
            player.queue.add(track);

            if (!player.playing && !player.paused) {
                player.play();
            }
            else {
                client.embed({
                    title: `${client.emotes.normal.music}・${track.title}`,
                    url: track.uri,
                    desc: `A szám hozzá lett adva a lejátszási listához!`,
                    thumbnail: track.thumbnail,
                    fields: [
                        {
                            name: `👤┆Kérte`,
                            value: `${track.requester}`,
                            inline: true
                        },
                        {
                            name: `${client.emotes.normal.clock}┆Vége`,
                            value: `<t:${((Date.now() / 1000) + (track.duration / 1000)).toFixed(0)}:f>`,
                            inline: true
                        },
                        {
                            name: `🎬┆Előadó`,
                            value: `${track.author}`,
                            inline: true
                        }
                    ],
                    type: 'editreply'
                }, interaction)
            }
        }
    }
}

 