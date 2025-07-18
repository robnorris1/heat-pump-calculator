import { House, HeatPump } from './types';

export function calculateHeatLoss(house: House): number {
    return house.floorArea * house.heatingFactor * house.insulationFactor;
}

export function calculatePowerHeatLoss(heatLoss: number, degreeDays: number): number {
    return heatLoss / degreeDays;
}

export function findSuitableHeatPump(pumps: HeatPump[], powerHeatLoss: number): HeatPump | null {
    return pumps
        .filter(p => p.outputCapacity >= powerHeatLoss)
        .sort((a, b) => a.outputCapacity - b.outputCapacity)[0] || null;
}

export function calculateCosts(pump: HeatPump) {
    const subtotal = pump.costs.reduce((sum, item) => sum + item.cost, 0);
    const vat = subtotal * 0.05; // 5% VAT
    const total = subtotal + vat;

    return {
        subtotal,
        vat,
        total,
        breakdown: pump.costs
    };
}
