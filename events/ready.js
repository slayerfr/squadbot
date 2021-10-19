const cfg = require("../config.json");
const Discord = require("discord.js")

module.exports = client => {

    channelID = "899639078864175108";
    msgChannel = client.channels.cache.get(channelID);

    const embed = new Discord.MessageEmbed()
    .setTitle("SquadBot - statut")
    .setDescription(`*=================* \n**${client.user.username} is ready** ! (||${client.user.id}||) \nAt **\`${client.guilds.cache.size}\` guilds** \n*=================*`)
    .setFooter(cfg.bot.footer)
    .setColor("RED")

    msgChannel.send({embeds: [embed]}); 

    console.log(`================= \n${client.user.username} is ready ! (${client.user.id}) \nAt ${client.guilds.cache.size} guilds \n=================`)

    let commandCount = client.commands.size;

    let jeuxs = [
        `.help | ${client.guilds.cache.size} serveurs`,
        `.help | ${client.users.cache.size} personnes`,
        `.help | ${client.channels.cache.size} channels`,
        `.help | ${client.guilds.cache.size} serveurs`
        ];
let index = 0
setInterval(() => {
        const activities_list = [
            "-help | " + client.users.cache.size + " utilisateurs 👤",
            "-help | " + commandCount + " commands 📚",
            "-help | v " + cfg.bot.version + " 💻 "

        ];

        client.user.setPresence({activities: [{name: activities_list[index], type: "WATCHING"}], status: 'idle'})
        index++
        if (index > (activities_list.length - 1)) index = 0

    }, 7000);    
};