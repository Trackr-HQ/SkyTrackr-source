const { SlashCommandBuilder, messageLink } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Greets the person who executed the command!'),
    execute (interaction) {
        interaction.reply(`What's up ${interaction.user}!`);
    },
};