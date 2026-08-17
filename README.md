
[![Version][version-shield]](version-url)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Discord-Bot&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>

<br />

[![Run on Repl.it](https://repl.it/badge/github/CorwinDev/Discord-Bot)](https://replit.com/@CorwinDeveloper/Discord-Bot-v14?v=1)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/CorwinDev/Discord-Bot)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/corwindev/Discord-Bot">
    <img src="https://cdn.discordapp.com/attachments/778665159316209748/1055857473749274694/Corwin-1-modified.png" alt="Pbot-plus" width="200" height="200">
  </a>

  <h3 align="center">Discord Bot</h3>

  <p align="center">
    A Discord Bot a <a href="https://github.com/DotwoodMedia/Dbot">Dbot</a> frissített változata, egy fejlett, sokoldalú Discord bot, ami több mint 400 parancsot tartalmaz.<br> Képes moderálásra, ticketekre, rádióra, játékokra, nyereményjátékokra, testreszabásra, gazdaságra, szintrendszerre, meghívókra, üzenetekre, hasznos eszközökre, javaslatokra, szerver statisztikákra és még sok másra.<br> Sajnos a tulajdonosok a csúcson leálltak és úgy döntöttek, hogy közzéteszik a forráskódot, amiből egy frissített verziót készítettem.
    <br />
    <br />
    <a href="https://github.com/corwindev/discord-bot/issues">Hiba jelentése</a>
    ·
    <a href="https://github.com/corwindev/discord-bot/issues">Funkció kérése</a>
  </p>
</p>

<!-- NOTICE -->

### <img src="https://cdn.discordapp.com/emojis/1055803759831294013.png" width="20px" height="20px"> 》Figyelmeztetés 
> Nem állíthatod, hogy ez a saját munkád! Az eredeti forráskódot a [Dotwood Media](https://github.com/DotwoodMedia) és a [Graphix Development](https://github.com/GraphixDevelopment) készítette. A forráskódot módosítottam és frissítettem (CorwinDev)

> A Discord Bot egy sokoldalú Discord bot, [Discord.js](https://github.com/Discordjs/discordjs) alapokon
Ha tetszik ez a repó, nyugodtan adj egy csillagot ⭐, hogy motiválj!

<!-- ABOUT THE PROJECT -->

## <img src="https://cdn.discordapp.com/emojis/859424401186095114.png" width="20px" height="20px">》Leírás 
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=corwindev&repo=Discord-bot&theme=tokyonight)](https://github.com/corwindev/Discord-bot)
## <img src="https://cdn.discordapp.com/emojis/852881450667081728.gif" width="20px" height="20px">》Funkciók
- [x] Slash parancsok
- [x] Naprakész a Discord.js v14-gyel
- [x] Automod
- [x] Egyedi parancsok
- [x] Zene parancsok
- [x] Ticketek
- [x] Hasznos eszköz parancsok
- [x] Javaslatok
- [x] Reakció szerepkörök
- [x] Család rendszer
- [x] Nyereményjátékok
- [x] Egyszerűen használható
- [x] Testreszabható
- [x] És még sok más
- [x] Nem szeretnéd magad üzemeltetni? [Használd a publikus botunkat](https://discord.com/api/oauth2/authorize?client_id=860390761307439114&permissions=8&scope=bot%20applications.commands)
## <img src="https://cdn.discordapp.com/emojis/1028680849195020308.png" width="25px" height="25px">》Képernyőképek
<br />
<p align="center">
  <a href="https://github.com/corwindev/discord-bot">
    <img src="https://cdn.discordapp.com/attachments/778665159316209748/1055832339328024666/207117434-d98356b1-bf19-418e-9e12-0ef83e0d9a21.png">
  </a>
</p>

## <img src="https://cdn.discordapp.com/emojis/1009754836314628146.gif" width="25px" height="25px">》Követelmények
- NodeJs v17+
- Java v13 a lavalink szerverhez.
- Discord Token. Szerezd be a [Discord Developers Portalon](https://discord.com/developers/applications)
- Mongo adatbázis URL. Szerezd be a [MongoDB-nél](https://cloud.mongodb.com/v2/635277bf9f5c7b5620db28a4#clusters)
- Giphy API Token. Szerezd be a [Giphy Developers Portalon](https://developers.giphy.com/)
- OpenAI API kulcs `az ai chatbothoz`. Szerezd be az [OpenAi Developers Portalon](https://beta.openai.com/account/api-keys)
- ClientID `a slash parancsok betöltéséhez.` [Discord Developers Portal](https://discord.com/developers/applications)
- Spotify client ID `a Spotify támogatáshoz` [Kattints ide a beszerzéshez](https://developer.spotify.com/dashboard/login)
- Spotify client Secret `a Spotify támogatáshoz` [Kattints ide a beszerzéshez](https://developer.spotify.com/dashboard/login)

## <img src="https://cdn.discordapp.com/emojis/814216203466965052.png" width="25px" height="25px">》Telepítési útmutató

### <img src="https://cdn.discordapp.com/emojis/1028680849195020308.png" width="15px" height="15px"> Telepítés [NPM](https://www.npmjs.com/)-mel
Klónozd a repót az alábbi paranccsal
```bash
git clone https://github.com/Corwindev/Discord-Bot.git
```
### Klónozás után töltsd ki az összes szükséges adatot a `.env` fájlban **(nevezd át az `.env.example` fájlt `.env`-re)**, majd futtasd
```bash
npm install
```
A bot indításához
```js
node src/index.js
```

## <img src="https://cdn.discordapp.com/emojis/1036083490292244493.png" width="15px" height="15px">》Támogatói szerver
[![DiscordBanner](https://invidget.switchblade.xyz/techpoint-1016942011024158782)](https://discord.gg/techpoint-1016942011024158782)

[Támogatói szerver](https://discord.gg/techpoint-1016942011024158782) - A Discord Bot támogatói szerverének meghívója

# <img src="https://cdn.discordapp.com/emojis/1015745034076819516.png" width="25px" height="25px">》Gyakori kérdések
> Hogyan férhetek hozzá a fejlesztői parancsokhoz? Be kell állítanod őket a MongoDB-n keresztül, vagy futtasd az alábbi parancsot.

```bash
npm run add-dev A_TE_Discord_ID-D
```
# Adományozás

 Az adományoddal segítesz a projekt fenntartásában 

<img src="https://cdn.discordapp.com/emojis/809085860632985630.png" width="15px" height="15px"> 》[Támogatás](https://github.com/sponsors/CorwinDev)

[version-shield]: https://img.shields.io/github/package-json/v/CorwinDev/Discord-Bot?style=for-the-badge
[version-url]: https://github.com/brblacky/WaveMusic
[contributors-shield]: https://img.shields.io/github/contributors/CorwinDev/Discord-Bot.svg?style=for-the-badge
[contributors-url]: https://github.com/Corwindev/Discord-Bot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Corwindev/Discord-Bot.svg?style=for-the-badge
[forks-url]: https://github.com/Corwindev/Discord-Bot/network/members
[stars-shield]: https://img.shields.io/github/stars/Corwindev/Discord-Bot.svg?style=for-the-badge
[stars-url]: https://github.com/Corwindev/Discord-Bot/stargazers
[issues-shield]: https://img.shields.io/github/issues/Corwindev/Discord-Bot.svg?style=for-the-badge
[issues-url]: https://github.com/Corwindev/Discord-Bot/issues
[license-shield]: https://img.shields.io/github/license/Corwindev/Discord-Bot.svg?style=for-the-badge
[license-url]: https://github.com/Corwindev/Discord-Bot/blob/master/LICENSE
