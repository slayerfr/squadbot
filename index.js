const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readdir = util.promisify(fs.readdir);

const { Client, MessageEmbed, Intents, MessageActionRow, MessageButton } = require('discord.js');

const cfg = require("./config.json");
const { channel } = require("diagnostics_channel");


const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL", "MESSAGE"] });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.class = new Discord.Collection(); 
client.categories =fs.readdirSync('./commands/');

const loadCommands = (dir = "./commands/") => {
  fs.readdirSync(dir).forEach(dirs => {
      const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
      client.class.set(dirs);
      if(commands.length <= 0){
          console.log("Commands folder is empty or missing !");
          return;
      }
      for(const file of commands) {
          const getFileName = require(`${dir}/${dirs}/${file}`);
          client.commands.set(getFileName.help.name, getFileName);
          getFileName.help.aliases.forEach(alias => { 
              client.aliases.set(alias, getFileName.help.name);
          });
          console.log(`Command: '${getFileName.help.name}' (${dirs}) was successfully loaded !`);
      };
  });
};

loadCommands();

readdir('./events/', (err, files) => {
  if(err) return console.log(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Event: '${evtName}' was successfully loaded !`);
    client.on(evtName, evt.bind(null, client));
  });
});   

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'help') {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('primary')
            .setLabel('Primary')
            .setStyle('PRIMARY'),
        );
  
      await interaction.reply({ content: 'sa arrive!', components: [row] });
    }
  });

  client.on('guildCreate', guild => {

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
          .setLabel('Add Me')
          .setStyle('LINK')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=899648530518515765&permissions=8&scope=bot')
      );

    const guildCreateEmbed = new MessageEmbed()
    .addField("Server Added", `ont viens de m'ajouter sur \`${guild.name}\`, je suis à \`${client.guilds.cache.size}\` **server(s)**`)
    .addField('🕶️ - Utilisateur', `${guild.memberCount}`, false)
    .addField('👑 - Createur', `<@${guild.ownerId}> - (||${guild.ownerId}||)`, false)
    .setThumbnail(guild.iconURL)
    .setColor("GREEN")
    .setTimestamp()

    msgChannel = client.channels.cache.get("899639129128706048")
    msgChannel.send({embeds: [guildCreateEmbed], components: [row]})
  })

  client.on('guildDelete', guild => {
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
          .setLabel('Add Me')
          .setStyle('LINK')
          .setURL('https://discord.com/api/oauth2/authorize?client_id=899648530518515765&permissions=8&scope=bot')
      );

    const guildRemoveEmbed = new MessageEmbed()
    .addField("Server Removed", `ont viens de me retirer du server \`${guild.name}\`, je passe à \`${client.guilds.cache.size}\` **server(s)**`)
    .addField('🧾 - Name', `${guild.name}`, false)
    .addField('🕶️ - Utilisateur', `${guild.memberCount}`, false)
    .addField('👑 - Createur', `<@${guild.ownerId}> - (||${guild.ownerId}||)`, false)
    .setThumbnail(guild.iconURL)
    .setColor("RED")
    .setTimestamp()

    msgChannel = client.channels.cache.get("899639203057524876")
    msgChannel.send({embeds: [guildRemoveEmbed], components: [row]})
  })

  /*client.on('messageCreate', async message => {
    if(message.content === `<@!${client.user.id}>`){
      message.channel.send(`**Hello** :wave: ${message.author}, mon prefix est \`${cfg.bot.DefaultPrefix}\` `)
    }
  })*/

client.login("token")
