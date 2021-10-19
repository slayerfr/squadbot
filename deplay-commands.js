const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const cfg = require('./config.json');
const index = require('./index.js');

const commands = [
	new SlashCommandBuilder().setName('help').setDescription('Help Command!')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(cfg.bot.token);

rest.put(Routes.applicationGuildCommands('899648530518515765', 896378500020326431), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);