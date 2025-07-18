import { House, HeatPump, WeatherApiClient } from './types';
import { calculateHeatLoss, calculatePowerHeatLoss, findSuitableHeatPump, calculateCosts } from './utils';

export class HeatPumpCalculator {
    constructor(private api: WeatherApiClient, private pumps: HeatPump[]) {}

    async processHouses(houses: House[]): Promise<string> {
        const results = await Promise.all(houses.map(house => this.processHouse(house)));
        return results.join('\n\n');
    }

    private async processHouse(house: House): Promise<string> {
        const heatLoss = calculateHeatLoss(house);
        const weather = await this.api.getWeatherData(house.designRegion);

        // NOTE: come back to this, its pretty ugly but i think it will work
        const lines = [
            '--------------------------------------',
            house.submissionId,
            '--------------------------------------'
        ];

        if (!weather) {
            lines.push(`  Heating Loss: ${heatLoss.toFixed(1)}`);
            lines.push('  Warning: Could not find design region');
            return lines.join('\n');
        }

        const powerHeatLoss = calculatePowerHeatLoss(heatLoss, weather.degreeDays);
        const pump = findSuitableHeatPump(this.pumps, powerHeatLoss);

        if (!pump) throw new Error(`No pump for ${powerHeatLoss}kW`);

        const costs = calculateCosts(pump);

        lines.push(`  Estimated Heat Loss = ${heatLoss.toFixed(1)}`);
        lines.push(`  Design Region = ${house.designRegion}`);
        lines.push(`  Power Heat Loss = ${powerHeatLoss.toFixed(2)}`);
        lines.push(`  Recommended Heat Pump = ${pump.label}`);
        lines.push('  Cost Breakdown');

        costs.breakdown.forEach(item => {
            lines.push(`    ${item.label}, £${item.cost.toFixed(2)}`);
        });

        lines.push(`  Total Cost, including VAT = £${costs.total.toFixed(2)}`);

        return lines.join('\n');
    }
}
