import { calculateHeatLoss, calculatePowerHeatLoss, findSuitableHeatPump, calculateCosts } from '../src/utils';
import { House, HeatPump } from '../src/types';

const mockHouse: House = {
    submissionId: 'TEST001',
    designRegion: 'London',
    floorArea: 100,
    age: '1990-2000',
    heatingFactor: 80,
    insulationFactor: 1.2
};

const mockHeatPumps: HeatPump[] = [
    {
        label: '5kW Package',
        outputCapacity: 5,
        costs: [
            { label: 'Unit', cost: 1000 },
            { label: 'Installation', cost: 500 }
        ]
    },
    {
        label: '10kW Package',
        outputCapacity: 10,
        costs: [
            { label: 'Unit', cost: 2000 },
            { label: 'Installation', cost: 800 }
        ]
    }
];

describe('Heat Pump Calculator Utils', () => {
    describe('calculateHeatLoss', () => {
        it('should calculate heat loss using the formula: floorArea * heatingFactor * insulationFactor', () => {
            expect(calculateHeatLoss(mockHouse)).toBe(9600);
        });

        it('should handle different property configurations', () => {
            const house: House = {
                submissionId: 'TEST002',
                designRegion: 'Manchester',
                floorArea: 150,
                age: '2000-2010',
                heatingFactor: 75,
                insulationFactor: 1.0
            };
            expect(calculateHeatLoss(house)).toBe(11250);
        });
    });

    describe('calculatePowerHeatLoss', () => {
        it('should calculate power heat loss using the formula: heatLoss / degreeDays', () => {
            const heatLoss = 9600;
            const degreeDays = 2400;
            expect(calculatePowerHeatLoss(heatLoss, degreeDays)).toBe(4);
        });
    });

    describe('findSuitableHeatPump', () => {
        it('should find the smallest suitable heat pump that meets power requirements', () => {
            expect(findSuitableHeatPump(mockHeatPumps, 4)).toEqual(mockHeatPumps[0]);
        });

        it('should select larger pump when smaller one is insufficient', () => {
            expect(findSuitableHeatPump(mockHeatPumps, 7)).toEqual(mockHeatPumps[1]);
        });

        it('should return null when no pump is suitable', () => {
            expect(findSuitableHeatPump(mockHeatPumps, 15)).toBeNull();
        });
    });

    describe('calculateCosts', () => {
        it('should calculate total costs with 5% VAT', () => {
            const result = calculateCosts(mockHeatPumps[0]);

            expect(result.subtotal).toBe(1500);
            expect(result.vat).toBe(75);
            expect(result.total).toBe(1575);
            expect(result.breakdown).toEqual(mockHeatPumps[0].costs);
        });
    });
});
