const Discord = require("discord.js");
const fs = require("fs");

const { Client, MessageEmbed } = require('discord.js');

const cfg = require("./config.json");


const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.class = new Discord.Collection(); 
client.categories =fs.readdirSync('./commands/');

loadCommands();

fs.readdir('./events/', (err, files) => {
    if(err) return console.log(err);
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const evt = require(`./events/${file}`);
      let evtName = file.split('.')[0];
      console.log(`Event: '${evtName}' was successfully loaded !`);
      client.on(evtName, evt.bind(null, client));
    });
  });   
  
  
  

client.login("ODk5NjQ4NTMwNTE4NTE1NzY1.YW10_A.szm_UfBCTn0AQuI2wGHixPn0wog")