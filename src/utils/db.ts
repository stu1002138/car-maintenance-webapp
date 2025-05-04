import Dexie, { Table } from 'dexie';

// Define interfaces for tables
interface Car {
  id?: number;
  PlateNo: string;
  Brand?: string;
}

interface Repair {
  id?: number;
  PlateNo: string;
  RepairDate: string;
  Vendor: string;
  RepairItem: string;
  RepairCode: string;
  Quantity: string;
  Amount: string;
  Mileage: string;
}

// Extend Dexie with typed tables
class AppDatabase extends Dexie {
  cars!: Table<Car>;
  repairs!: Table<Repair>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      cars: '++id, PlateNo, Brand',
      repairs: '++id, PlateNo, RepairDate, Vendor, RepairItem, RepairCode, Quantity, Amount, Mileage',
    });
  }
}

export const db = new AppDatabase();