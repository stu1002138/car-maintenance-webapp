import Dexie from 'dexie';
// Extend Dexie with typed tables
class AppDatabase extends Dexie {
    cars;
    repairs;
    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            cars: '++id, PlateNo, Brand',
            repairs: '++id, PlateNo, RepairDate, Vendor, RepairItem, RepairCode, Quantity, Amount, Mileage',
        });
    }
}
export const db = new AppDatabase();
