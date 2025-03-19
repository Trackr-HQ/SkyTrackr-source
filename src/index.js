const {Client, GatewayIntentBits, Collection} = require('discord.js');
require('dotenv').config();
const token = process.env.token;

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent]});

client.commands = new Collection();

const fs = require('fs');

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleCommands(commandFolders, "./commands");
    client.login(token);
})();



client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.log(error);
        await interaction.reply({
            content: 'There was a problem executing this command',
            ephemeral: true
        });
    }
})