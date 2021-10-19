const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");

module.exports.run = async (client, message, args, prefixes, lang, getLang) => { 

    const HelpEmbed = new Discord.MessageEmbed()
    .setTitle(getLang.help.title)
    .addField(`${getLang.help.moderator}`, "`help`, `say`", false)
    .addField(`${getLang.help.configurator}`, `Indefined`, false)
    .addField(`${getLang.help.giveaway}`, `Indefined`, false)
    .addField(`${getLang.help.economy}`, `Indefined`, false)
    .addField(`${getLang.help.funny}`, `Indefined`, false)
    .setColor("RANDOM")
    .setFooter(cfg.bot.footer)

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
          .setLabel('Add Bot')
          .setStyle('LINK')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=899648530518515765&permissions=8&scope=bot')
      );
    
        message.channel.send({embeds: [HelpEmbed], components: [row]})
}

module.exports.help = {
    name: `help`,
    aliases: ['h', 'a', 'aide'],
    category: "general",
    descriptionfr: "Voir toutes les commandes disponible",
    descriptionen: "Show all command",
    usage: "`.help`",
    botPermissions: [],
    userPermissions: [],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}