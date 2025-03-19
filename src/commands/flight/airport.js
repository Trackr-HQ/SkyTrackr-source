const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('airport')
        .setDescription('Get airport details by IATA or ICAO code')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('The airport code (e.g., LAX, JFK, KORD)')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        const code = interaction.options.getString('code').toUpperCase();
        
        const URL = `https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat`;

        try {
            const response = await axios.get(URL);

            const airportsData = response.data.split('\n'); 
            
            const airport = airportsData.find((data) => {
                const fields = data.split(',');
                const airportCode = fields[4].replace(/"/g, '').trim(); 
                return airportCode === code;
            });

            if (!airport) {
                return interaction.editReply({ content: "Airport not found." });
            }
            const fields = airport.split(',');
            const name = fields[1].replace(/"/g, '').trim();
            const city = fields[2].replace(/"/g, '').trim();
            const country = fields[3].replace(/"/g, '').trim();
            const latitude = fields[6].trim();
            const longitude = fields[7].trim();

            await interaction.editReply(`**Airport Info:**\n
**Name:** ${name}\n
**City:** ${city}\n
**Country:** ${country}\n
**Latitude:** ${latitude}\n
**Longitude:** ${longitude}
            `);
        } catch (error) {
            console.error('Error fetching airport data:', error);
            await interaction.editReply({ content: `Error fetching airport data: ${error.message}` });
        }
    },
};
