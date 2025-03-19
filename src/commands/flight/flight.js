const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');

const API_KEY = process.env.API_KEY;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flight')
        .setDescription('Get flight details by flight number')
        .addStringOption(option =>
            option.setName('number')
                .setDescription('Enter the flight number (e.g., BA400)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const flightNumber = interaction.options.getString('number').toUpperCase();

        try {
            // aviationstack is free but you get only 100 api requests a month, you might want to change this to use a different apoi if you want
            const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
                params: {
                    access_key: API_KEY,
                    flight_iata: flightNumber,
                },
            });

            const flights = response.data.data;
            if (!flights || flights.length === 0) {
                return interaction.reply(`No data found for flight ${flightNumber}`);
            }

            const flight = flights[0];
            const replyMessage = `**Flight ${flight.flight.iata} Details:**
- **Aircraft:** ${flight.aircraft.registration || 'Unknown'}
- **Departure:** ${flight.departure.airport || 'Unknown'} (${flight.departure.iata || ''})
- **Arrival:** ${flight.arrival.airport || 'Unknown'} (${flight.arrival.iata || ''})
- **Altitude:** ${flight.live?.altitude || 'N/A'} ft
- **Speed:** ${flight.live?.speed_horizontal || 'N/A'} knots
- **Status:** ${flight.flight_status}`;


            await interaction.reply(replyMessage);
        } catch (error) {
            console.error(error);
            await interaction.reply(`Error fetching data for flight ${flightNumber}`);
        }
    }
};
