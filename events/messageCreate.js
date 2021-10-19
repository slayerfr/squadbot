const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cfg = require("../config.json")
const errors = require("../utils/error.js")
module.exports = async (client, message) => {


    if(message.content === `<@!${client.user.id}>`){
        message.channel.send(`**Hello** :wave: ${message.author}, mon prefix est \`${cfg.bot.DefaultPrefix}\` `)
    }

    if(message.author.bot) return;

    let prefixes = cfg.bot.DefaultPrefix
    let lang = cfg.bot.DefaultLangage
    let getLang = require(`../lang/${lang}`)
 
    if(!message.content.startsWith(prefixes)) return;

    const args = message.content.slice(prefixes.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const mid = message.mentions.users.first()

    let commandfile;

    if(client.commands.has(cmd)) {
        commandfile = client.commands.get(cmd);
    } else if (client.aliases.has(cmd)){
        commandfile = client.commands.get(client.aliases.get(cmd));
    } else {
        return;
    }

    if(commandfile.help.enabled == false) return message.reply(`${cfg.emojis.warning}  | **Cette commande est actuellement désactivé !**`)

    if(commandfile.help.botPermissions) {
        let neededPermissions = [];

        commandfile.help.botPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
            neededPermissions.push(perm);
        }
        })
        if (neededPermissions.length !== 0) {
        if (neededPermissions.length > 1) {
            return errors.botMultiPerms(message, neededPermissions.map((p) => `\`${p}\``).join(", "), lang)
        } else {
            return message.channel.send(`**Je n'est pas les permission requise:** \`${neededPermissions}\``)
        }
    }
}

    if (commandfile.help.userPermissions) {

        let neededPermissions = [];

        commandfile.help.userPermissions.forEach((perm) => {

            let perms = String(perm)

            if (!message.member.permissions.has(Discord.Permissions.FLAGS[ perms ])) {
                neededPermissions.push(perm);
            }
        })
        if (neededPermissions.length !== 0) {
            if (neededPermissions.length > 1) {
                return errors.noMultiPerms(message, neededPermissions.map((p) => `\`${p}\``).join(", "), lang)
            } else {
                return errors.noPerms(message, "`" + neededPermissions + "`", lang)
            }
        }
    }  


            
    if(commandfile.help.staffOnly == true) {
        if(!cfg.staff.moderators.id.includes(message.author.id)) return errors.noStaff(message, lang)
      }
  
      if(commandfile.help.ownerOnly == true) {
          if(!cfg.staff.owners.id.includes(message.author.id)) return errors.noOwner(message, lang)
      }  
       


    const commandE = new Discord.MessageEmbed()
    .setTitle(`${cfg.emojis.command} Command execution`)
    .setColor("RANDOM")
    .addField(`<:label:750780936320450631> Name`, `${commandfile.help.name}`, false)
    .addField(`<:roleList:750781042041946122> Author`, `${message.author.tag}`, false)
    .addField(`<:cityhall:756245380437508116> Guild`, `${message.guild.name}`, false)

    const channelExec = client.channels.cache.get("899970892443033621")

    const webhooks = await channelExec.fetchWebhooks();
		const webhook = webhooks.first();

		await webhook.send({
			content: 'Command Executé',
			username: 'SquadBot périphe',
			avatarURL: 'https://i.imgur.com/AfFp7pu.png',
			embeds: [commandE],
		});

    commandfile.run(client, message, args, prefixes, lang, getLang, cfg); 

    console.log("CMD: " + message.content)
    
};
