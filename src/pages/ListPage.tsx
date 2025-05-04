import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { db } from '../utils/db';
import dayjs from 'dayjs';

interface Car {
  id?: number;
  PlateNo: string;
  Brand?: string;
  LastRepairDate?: string;
}

interface RepairItem {
  id?: number;
  RepairDate: string;
  Vendor: string;
  RepairItem: string;
  RepairCode: string;
  Quantity: string;
  Amount: string;
  Mileage: string;
  PlateNo: string;
}

export default function ListPage() {
  const [repairs, setRepairs] = useState<RepairItem[]>([]);
  const [filtered, setFiltered] = useState<RepairItem[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    PlateNo: '',
    RepairItem: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const allRepairs = await db.table('repairs').orderBy('id').toArray() as SetStateAction<RepairItem[]>;
      const allCars = await db.table('cars').orderBy('id').toArray() as SetStateAction<Car[]>;
      setRepairs(allRepairs);
      setFiltered(allRepairs);
      setCars(allCars);
    };
    fetchData();
  }, []);

  const allRepairItems = Array.from(new Set(repairs.map((r) => r.RepairItem))).filter(Boolean);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    let filtered = repairs;

    if (filters.startDate) {
      filtered = filtered.filter(r =>
        dayjs(r.RepairDate).isAfter(dayjs(filters.startDate), 'day')
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(r =>
        dayjs(r.RepairDate).isBefore(dayjs(filters.endDate), 'day')
      );
    }
    if (filters.PlateNo) {
      filtered = filtered.filter(r => r.PlateNo === filters.PlateNo);
    }
    if (filters.RepairItem) {
      filtered = filtered.filter(r => r.RepairItem === filters.RepairItem);
    }

    setFiltered(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 sm:p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">保養紀錄列表</h2>

      {/* Filters */}
      <div className="flex gap-4 px-3 flex-col flex-wrap print:hidden">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full text-sm"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full text-sm"
        />
        <div className='flex flex-col gap-4'>
          <select
            name="PlateNo"
            value={filters.PlateNo}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full text-sm"
          >
            <option value="">所有車牌</option>
            {cars.map((car) => (
              <option key={car.id} value={car.PlateNo}>{car.PlateNo}</option>
            ))}
          </select>
          <select
            name="RepairItem"
            value={filters.RepairItem}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full text-sm"
          >
            <option value="">所有保養項目</option>
            {allRepairItems.map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-auto"
          >
            搜尋
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">日期</th>
              <th className="border px-4 py-2">車牌</th>
              <th className="border px-4 py-2">廠商</th>
              <th className="border px-4 py-2">保養項目</th>
              <th className="border px-4 py-2">項目</th>
              <th className="border px-4 py-2">數量</th>
              <th className="border px-4 py-2">金額</th>
              <th className="border px-4 py-2">公里數</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{dayjs(r.RepairDate).format('YYYY/MM/DD')}</td>
                  <td className="border px-4 py-2">{r.PlateNo}</td>
                  <td className="border px-4 py-2">{r.Vendor}</td>
                  <td className="border px-4 py-2">{r.RepairItem}</td>
                  <td className="border px-4 py-2">{r.RepairCode}</td>
                  <td className="border px-4 py-2 text-right">{r.Quantity}</td>
                  <td className="border px-4 py-2 text-right">{Number(r.Amount).toLocaleString()}</td>
                  <td className="border px-4 py-2 text-right">{Number(r.Mileage).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  查無資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block lg:hidden">
        {filtered.length > 0 ? (
          filtered.map((r, i) => (
            <div key={i} className="p-4 mb-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-semibold">日期</div>
                <div>{dayjs(r.RepairDate).format('YYYY/MM/DD')}</div>
                <div className="font-semibold">車牌</div>
                <div>{r.PlateNo}</div>
                <div className="font-semibold">廠商</div>
                <div>{r.Vendor}</div>
                <div className="font-semibold">保養項目</div>
                <div>{r.RepairItem}</div>
                <div className="font-semibold">項目</div>
                <div>{r.RepairCode}</div>
                <div className="font-semibold">數量</div>
                <div className="text-right">{r.Quantity}</div>
                <div className="font-semibold">金額</div>
                <div className="text-right">{Number(r.Amount).toLocaleString()}</div>
                <div className="font-semibold">公里數</div>
                <div className="text-right">{Number(r.Mileage).toLocaleString()}</div>
              </div>
              <div className='w-full h-[2px] bg-gray mt-4 rounded'></div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">查無資料</div>
        )}
      </div>
    </div>
  );
}