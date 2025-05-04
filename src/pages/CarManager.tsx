import { useState, useEffect } from 'react';
import { db } from '../utils/db';

export default function CarManager() {
  const [form, setForm] = useState({
    PlateNo: '',
    Brand: '',
    LastRepairDate: ''
  });

  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const allCars = await db.table('cars').orderBy('id').toArray();
    setCars(allCars);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.table('cars').add(form);
    setForm({ PlateNo: '', Brand: '', LastRepairDate: '' });
    await loadCars();
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">管理汽車資訊</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            name="PlateNo"
            placeholder="車牌號碼"
            value={form.PlateNo}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="Brand"
            placeholder="廠牌"
            value={form.Brand}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="LastRepairDate"
            placeholder="上次保養日期 (例：2024/04/01)"
            value={form.LastRepairDate}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              儲存車輛資訊
            </button>
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-2">已登錄車輛</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">車牌號碼</th>
                <th className="p-2 border">廠牌</th>
                <th className="p-2 border">上次保養日期</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{car.PlateNo}</td>
                  <td className="p-2 border">{car.Brand}</td>
                  <td className="p-2 border">{car.LastRepairDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}