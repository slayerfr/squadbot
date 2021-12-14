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





  /*client.on('messageCreate', async message => {
    if(message.content === `<@!${client.user.id}>`){
      message.channel.send(`**Hello** :wave: ${message.author}, mon prefix est \`${cfg.bot.DefaultPrefix}\` `)
    }
  })*/

client.login("token")
