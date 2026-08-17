const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  let verifLevels = {
    "0": "Nincs",
    "1": "Alacsony",
    "2": "Közepes",
    "3": "(╯°□°）╯︵  ┻━┻",
    "4": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
  }

  let region = {
    "brazil": `:flag_br: `,
    "eu-central": `:flag_eu: `,
    "singapore": `:flag_sg: `,
    "us-central": `:flag_us: `,
    "sydney": `:flag_au: `,
    "us-east": `:flag_us: `,
    "us-south": `:flag_us: `,
    "us-west": `:flag_us: `,
    "eu-west": `:flag_eu: `,
    "vip-us-east": `:flag_us: `,
    "europe": `:flag_gb:`,
    "amsterdam": `:flag_nl:`,
    "hongkong": `:flag_hk: `,
    "russia": `:flag_ru: `,
    "southafrica": `:flag_za: `
  }

  let tier = {
     "0": "Nincs",
    "1": "1. SZINT",
    "2": "2. SZINT",
    "3": "**3. SZINT**"
  }

  const members = await interaction.guild.members.fetch();

  client.embed({
    title: `ℹ️・Szerver információ`,
    desc: `Információ a szerverről: ${interaction.guild.name}`,
    thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
    image: interaction.guild.bannerURL({ size: 1024 }),
    fields: [
      {
        name: "Szerver neve:",
        value: `${interaction.guild.name}`,
        inline: true,
      },
      {
        name: "Szerver azonosító:",
        value: `${interaction.guild.id}`,
        inline: true,
      },
      {
        name: "Tulajdonos: ",
        value: `<@!${interaction.guild.ownerId}>`,
        inline: true
      },
      {
        name: "Ellenőrzési szint: ",
        value: `${verifLevels[interaction.guild.verificationLevel]}`,
        inline: true
      },
      {
        name: "Boost szint: ",
        value: `${tier[interaction.guild.premiumTier]}`,
        inline: true
      },
      {
        name: "Boostok száma:",
        value: `${interaction.guild.premiumSubscriptionCount || '0'} boost`,
        inline: true
      },
      {
        name: "Létrehozva:",
        value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
        inline: true
      },
      {
        name: "Tagok:",
        value: `${interaction.guild.memberCount} tag!`,
        inline: true
      },
      {
        name: "Botok:",
        value: `${members.filter(member => member.user.bot).size} bot!`,
        inline: true
      },
      {
        name: "Szöveges csatornák: ",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size} csatorna!`,
        inline: true
      },
      {
        name: "Hangcsatornák:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildVoice).size} csatorna!`,
        inline: true
      },
      {
        name: "Stage csatornák:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildStageVoice).size} csatorna!`,
        inline: true
      },
      {
        name: "Hírcsatornák:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildAnnouncement).size} csatorna!`,
        inline: true
      },
      {
        name: "Nyilvános szálak:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size} szál!`,
        inline: true
      },
      {
        name: "Privát szálak:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size} szál!`,
        inline: true
      },
      {
        name: "Rangok:",
        value: `${interaction.guild.roles.cache.size} rang!`,
        inline: true
      },
      {
        name: "Emojik száma:",
        value: `${interaction.guild.emojis.cache.size} emoji`,
        inline: true
      },
      {
        name: "Matricák száma:",
        value: `${interaction.guild.stickers.cache.size} matrica`,
        inline: true
      }
    ],
    type: 'editreply'
  }, interaction)
}

   
