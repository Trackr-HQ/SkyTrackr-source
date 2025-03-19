const {REST} = require("@discordjs/rest");
const { error } = require("console");
const {Routes} = require('discord-api-types/v10');

const fs = require('fs');
const { version } = require("os");
const path = require("path");
require('dotenv').config();

const clientId = 'YOUR BOTS CLIENT ID GOES HERE';
const guildId = process.env.guild;
const token = process.env.token;

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({
            version: '10'
        }).setToken(token);

        (async () => {
            try {
                console.log('Started regreshing application commands.');
                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );
                console.log('Successfully reloaded application commands.')
            } catch (error) {
                console.error(error);
            }
        })();

    }
}