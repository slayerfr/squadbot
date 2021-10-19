const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");

module.exports.run = async (client, message, args, prefixes, lang, getLang) => { 

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
          .setLabel('Title')
          .setStyle('PRIMARY')
          .setCustomId('primary')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=899648530518515765&permissions=8&scope=bot')
      )
      .addComponents(
        new Discord.MessageButton()
        .setLabel('Title')
        .setStyle('PRIMARY')
        .setCustomId('primary')
      )
      .addComponents(
        new Discord.MessageButton()
        .setLabel('Title')
        .setStyle('PRIMARY')
        .setCustomId('primary')
      )
      .addComponents(
        new Discord.MessageButton()
        .setLabel('Title')
        .setStyle('PRIMARY')
        .setCustomId('primary')
      )
      .addComponents(
        new Discord.MessageButton()
        .setLabel('Title')
        .setStyle('PRIMARY')
        .setCustomId('primary')
      )
      .addComponents(
        new Discord.MessageButton()
        .setLabel('Title')
        .setStyle('PRIMARY')
        .setCustomId('primary')
      );
    
}

module.exports.help = {
    name: `create-embed`,
    aliases: ['c-embed'],
    category: "general",
    descriptionfr: "Createur d'embed",
    descriptionen: "embed creator",
    usage: "`.create-embed`",
    botPermissions: [],
    userPermissions: [ "ADMINISTRATOR" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}