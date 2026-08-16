const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const gchannel = interaction.options.getChannel('channel');
    const duration = interaction.options.getString('duration');
    const winnerCount = interaction.options.getNumber('winners');
    const prize = interaction.options.getString('prize');

    client.giveawaysManager.start(gchannel, {
        duration: ms(duration),
        prize: `${client.emotes.normal.gift} - ${prize}`,
        lastChance: {
            enabled: true,
            content: `${client.emotes.normal.error} **UTOLSÓ ESÉLY A JELENTKEZÉSRE!** ${client.emotes.normal.error}`,
            threshold: 5000,
            embedColor: '#FF0000'
        },
        pauseOptions: {
            isPaused: false,
            content: '⚠️ **EZ A NYEREMÉNYJÁTÉK SZÜNETEL!** ⚠️',
            unPauseAfter: null,
            embedColor: '#FFFF00'
        },
        winnerCount: parseInt(winnerCount),
        hostedBy: interaction.user,
        thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
        messages: {
            giveaway: `${client.emotes.normal.party} **NYEREMÉNYJÁTÉK** ${client.emotes.normal.party}`,
            giveawayEnded: `${client.emotes.normal.party} **NYEREMÉNYJÁTÉK VÉGET ÉRT** ${client.emotes.normal.party}`,
            drawing: `${client.emotes.normal.clock} - Vége: **{timestamp}**!`,
            inviteToParticipate: "Reagálj 🥳 emojival a jelentkezéshez! \n",
            winMessage: "Gratulálunk {winners}! Megnyerted a **{this.prize}** nyereményt!",
            embedFooter: "Nyereményjáték!",
            embedColor: client.config.colors.normal,
            noWinner: "A nyereményjáték törölve, nincs elég résztvevő. \n",
            hostedBy: `${client.emotes.normal.party} - Szervezte: {this.hostedBy}`,
            winners: `🏆 - Nyertes(ek)`,
            endedAt: "Vége:",
            units: {
                seconds: "másodperc",
                minutes: "perc",
                hours: "óra",
                days: "nap",
                pluralS: false
            },
        },

    }).then((gData) => {
        client.succNormal({
            text: `Nyereményjáték elindítva itt: ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
}

 