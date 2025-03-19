const { SlashCommandBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns the ping of the bot.'),
    async execute (interaction, client) {
        await interaction.reply({content: `${client.ws.ping}ms`});
    }
}