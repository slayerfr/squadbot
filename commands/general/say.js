const Discord = require("discord.js");
const ms = require("ms")
const cfg = require("../../config.json");
const { stripIndents } = require("common-tags");

module.exports.run = async (client, message, args, prefixes, lang, getLang) => { 

    const sayMessage = args.join(" ");
    
    if(!sayMessage) return message.channel.send(`${cfg.emojis.error} Vous devez Indiquer un message`)

    if(sayMessage)
    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
}

module.exports.help = {
    name: `say`,
    aliases: ['s'],
    category: "general",
    descriptionfr: "Envoyer un message via le bot",
    descriptionen: "Say a messsage with bot",
    usage: "`.say <message>`",
    botPermissions: [],
    userPermissions: [ "MANAGE_MESSAGES" ],
    blacklists: true,
    staffOnly: false, 
    ownerOnly: false,
    disabled: false
}