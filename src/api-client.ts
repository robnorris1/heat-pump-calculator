import { WeatherData, WeatherApiClient } from './types';

export class RealWeatherApiClient implements WeatherApiClient {
    private readonly baseUrl = process.env.WEATHER_API_BASE_URL!;
    private readonly apiKey = process.env.WEATHER_API_KEY!;

    async getWeatherData(location: string): Promise<WeatherData | null> {
        try {
            const url = `${this.baseUrl}?location=${encodeURIComponent(location)}`;

            const response = await fetch(url, {
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            //418, im a teapot XD

            if (response.status === 404) {
                console.log(`Weather data not found for location: ${location}`);
                return null;
            }

            if (!response.ok) {
                throw new Error(`HTTP error, status: ${response.status}`);
            }

            const data = await response.json();

            //Response from postman:
            // {
            //     "location": {
            //     "location": "Thames Valley (Heathrow)",
            //         "degreeDays": "2033",
            //         "groundTemp": "11.3",
            //         "postcode": "TW6",
            //         "lat": "51.470022",
            //         "lng": "-0.454296"
            // }
            // }

            return {
                location: data.location.location,
                degreeDays: parseInt(data.location.degreeDays),
                groundTemp: parseInt(data.location.groundTemp),
                postcode: data.location.postcode,
                lat: parseFloat(data.location.lat),
                lng: parseFloat(data.location.lng)
            };

        } catch (error) {
            console.error(`Error fetching weather data for ${location}:`, error);
            return null;
        }
    }


}
