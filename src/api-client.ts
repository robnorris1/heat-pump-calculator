import { WeatherData, IWeatherApiClient } from './types';

export class WeatherApiClientImp implements IWeatherApiClient {
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

            if (response.status === 404) {
                console.log(`Weather data not found for location: ${location}`);
                return null;
            }

            if (!response.ok) {
                throw new Error(`HTTP error, status: ${response.status}`);
            }

            const data = await response.json();

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
