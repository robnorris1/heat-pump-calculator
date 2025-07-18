import 'dotenv/config';
import { HeatPumpCalculator } from './calculator';
import { RealWeatherApiClient } from './api-client';
import { House, HeatPump } from './types';
import * as fs from 'fs';
import * as path from 'path';

async function loadData() {
    const housesPath = path.join(__dirname, '../data/houses.json');
    const pumpsPath = path.join(__dirname, '../data/heat-pumps.json');

    const houses: House[] = JSON.parse(fs.readFileSync(housesPath, 'utf-8'));
    const pumps: HeatPump[] = JSON.parse(fs.readFileSync(pumpsPath, 'utf-8'));

    return { houses, pumps };
}

async function main() {
    const { houses, pumps } = await loadData();
    const apiClient = new RealWeatherApiClient();
    const calculator = new HeatPumpCalculator(apiClient, pumps);
    const result = await calculator.processHouses(houses);
    console.log(result);
}

main().catch(console.error);
