const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('user');
    const author = interaction.user;

    if (author.id == target.id) return client.errNormal({
        error: "Nem örökbe fogadhatod önmagad",
        type: 'editreply'
    }, interaction);

    if (target.bot) return client.errNormal({
        error: "Nem fogadhatsz örökbe egy botot",
        type: 'editreply'
    }, interaction);

    const familyMember = await Schema.findOne({ Guild: interaction.guild.id, User: target.id, Parent: author.id });
    const familyMember2 = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Parent: target.id });
    const familyMember3 = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Partner: target.id });

    if (familyMember || familyMember2 || familyMember3) {
        return client.errNormal({
            error: `Nem fogadhatsz örökbe egy családtagot!`,
            type: 'editreply'
        }, interaction);
    }

    const checkAdopt = await Schema.findOne({ Guild: interaction.guild.id, Children: target.username });
    if (checkAdopt) {
        return client.errNormal({
            error: `Ez a felhasználó már örökbe lett fogadva`,
            type: 'editreply'
        }, interaction);
    }

    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('adopt_yes')
                .setEmoji('✅')
                .setStyle(Discord.ButtonStyle.Success),

            new Discord.ButtonBuilder()
                .setCustomId('adopt_deny')
                .setEmoji('❌')
                .setStyle(Discord.ButtonStyle.Danger),
        );

    client.embed({
        title: `👪・Örökbefogadás`,
        desc: `${author} megkérte ${target} felhasználót, hogy fogadja őt örökbe! \n${target} kattints az egyik gombra`,
        components: [row],
        content: `${target}`,
        type: 'editreply',
    }, interaction)

    const filter = i => i.user.id === target.id;

    interaction.channel.awaitMessageComponent({ filter, componentType: Discord.ComponentType.Button, time: 60000 }).then(async i => {
        if (i.customId == "adopt_yes") {

            Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                if (data) {
                    data.Children.push(target.username);
                    data.save();
                }
                else {
                    new Schema({
                        Guild: interaction.guild.id,
                        User: author.id,
                        Children: target.username
                    }).save();
                }
            })

            Schema.findOne({ Guild: interaction.guild.id, User: target.id }, async (err, data) => {
                if (data) {
                    data.Parent.push(author.username);
                    data.save();
                }
                else {
                    new Schema({
                        Guild: interaction.guild.id,
                        User: target.id,
                        Parent: author.username
                    }).save();
                }
            })

            client.embed({
                title: `👪・Örökbefogadás - Elfogadva`,
                desc: `${author} mostantól ${target} büszke szülője! 🎉`,
                components: [],
                type: 'editreply'
            }, interaction);
        }

        if (i.customId == "adopt_deny") {
            client.embed({
                title: `👪・Örökbefogadás - Elutasítva`,
                desc: `${target} nem akarja, hogy ${author} örökbe fogadja`,
                components: [],
                type: 'editreply'
            }, interaction);
        }
    }).catch(() => {
        client.embed({
            title: `👪・Örökbefogadás - Elutasítva`,
            desc: `${target} nem válaszolt! Az örökbefogadás megszakítva`,
            components: [],
            type: 'editreply'
        }, interaction);
    });
}

 