import { useEffect, useState } from 'react';
import { db } from '../utils/db';
import dayjs from 'dayjs'; // Import dayjs

export default function ListPage() {
  const [repairs, setRepairs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    PlateNo: '',
    RepairItem: '',
  });

  // Load repair records and car list
  useEffect(() => {
    const fetchData = async () => {
      const allRepairs = await db.table('repairs').orderBy('id').toArray();
      const allCars = await db.table('cars').orderBy('id').toArray();
      setRepairs(allRepairs);
      setFiltered(allRepairs);
      setCars(allCars);
    };
    fetchData();
  }, []);

  // All repair items (for filter select)
  const allRepairItems = Array.from(new Set(repairs.map((r) => r.RepairItem))).filter(Boolean);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
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
    <>
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">保養紀錄列表</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 print:hidden">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <select
            name="PlateNo"
            value={filters.PlateNo}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
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
            className="border px-3 py-2 rounded"
          >
            <option value="">所有保養項目</option>
            {allRepairItems.map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>
          <div className="col-span-full">
            <button
              onClick={applyFilter}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              搜尋
            </button>
          </div>
        </div>

        {/* Data table */}
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
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  查無資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}