export interface House {
    submissionId: string;
    designRegion: string;
    floorArea: number;
    age: string;
    heatingFactor: number;
    insulationFactor: number;
}

export interface WeatherData {
    location: string;
    degreeDays: number;
    groundTemp: number;
    postcode: string;
    lat: number;
    lng: number;
}

export interface CostItem {
    label: string;
    cost: number;
}

export interface HeatPump {
    label: string;
    outputCapacity: number;
    costs: CostItem[];
}

export interface IWeatherApiClient {
    getWeatherData(location: string): Promise<WeatherData | null>;
}
