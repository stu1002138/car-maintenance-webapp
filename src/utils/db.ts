// db.js
import Dexie from 'dexie';

export const db = new Dexie('CarRepairDB');

db.version(1).stores({
  repairs: '++id, PlateNo, RepairDate, Vendor, RepairItem, RepairCode, Quantity, Amount, Mileage',
  cars: '++id, PlateNo, Brand, LastRepairDate'
});