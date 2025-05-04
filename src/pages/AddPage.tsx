import { useState, useEffect, SetStateAction, ChangeEvent, FormEvent } from 'react';
import { db } from '../utils/db';
import dayjs from 'dayjs';

interface Car {
  id?: number; // Dexie auto-generates 'id' if it's the primary key
  PlateNo: string;
  Brand?: string; // Optional, based on your usage
}

export default function AddPage() {
  const [form, setForm] = useState({
    PlateNo: '',
    RepairDate: '',
    Vendor: '',
    RepairItem: '',
    RepairCode: '',
    Quantity: '',
    Amount: '',
    Mileage: ''
  });

  const [cars, setCars] = useState<Car[]>([]);
  const [fileMessage, setFileMessage] = useState('');
  const [jsonMessage, setJsonMessage] = useState('');
  const [jsonInput, setJsonInput] = useState('');

  useEffect(() => {
    const loadCars = async () => {
      const allCars = await db.table('cars').toArray() as SetStateAction<Car[]>;
      setCars(allCars);
    };
    loadCars();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'RepairDate') {
      const formattedDate = value ? dayjs(value).format('YYYY/MM/DD') : '';
      setForm((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        setFileMessage('❌ JSON 格式錯誤，必須為陣列');
        return;
      }

      const requiredFields = ['PlateNo', 'Vendor', 'RepairItem', 'RepairCode', 'Quantity', 'Amount', 'Mileage', 'RepairDate'];
      const valid = data.every(item =>
        requiredFields.every(field => field in item)
      );

      if (!valid) {
        setFileMessage('❌ 匯入失敗：缺少必要欄位');
        return;
      }

      const formattedData = data.map(item => ({
        ...item,
        RepairDate: dayjs(item.RepairDate).format('YYYY/MM/DD')
      }));

      await db.repairs.bulkAdd(formattedData);
      setFileMessage(`✅ 匯入成功，共 ${data.length} 筆資料`);
    } catch (err) {
      console.error(err);
      setFileMessage('❌ 匯入失敗，請檢查檔案內容是否正確');
    }
  };

  const handleJsonPaste = async () => {
    try {
      const data = JSON.parse(jsonInput);

      if (!Array.isArray(data)) {
        setJsonMessage('❌ JSON 格式錯誤，必須為陣列');
        return;
      }

      const requiredFields = ['PlateNo', 'Vendor', 'RepairItem', 'RepairCode', 'Quantity', 'Amount', 'Mileage', 'RepairDate'];
      const valid = data.every(item =>
        requiredFields.every(field => field in item)
      );

      if (!valid) {
        setJsonMessage('❌ 匯入失敗：缺少必要欄位');
        return;
      }

      const formattedData = data.map(item => ({
        ...item,
        RepairDate: dayjs(item.RepairDate).format('YYYY/MM/DD')
      }));

      await db.repairs.bulkAdd(formattedData);
      setJsonMessage(`✅ 匯入成功，共 ${data.length} 筆資料`);
      setJsonInput('');
    } catch (err) {
      console.error(err);
      setJsonMessage('❌ 匯入失敗，請檢查 JSON 內容是否正確');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedForm = {
      ...form,
      RepairDate: form.RepairDate ? dayjs(form.RepairDate).format('YYYY/MM/DD') : ''
    };
    await db.repairs.add(formattedForm);
    alert('保養紀錄已儲存！');
    setForm({
      PlateNo: '',
      RepairDate: '',
      Vendor: '',
      RepairItem: '',
      RepairCode: '',
      Quantity: '',
      Amount: '',
      Mileage: ''
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">新增保養紀錄</h2>
        <p className="text-gray-600 mb-8 text-center">選擇以下三種方式之一來新增保養紀錄</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Method 1: Manual Entry */}
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">📝 單筆輸入</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <select
                name="PlateNo"
                value={form.PlateNo}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
              >
                <option value="">選擇車牌號碼</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.PlateNo}>
                    {car.PlateNo}（{car.Brand}）
                  </option>
                ))}
              </select>
              <input
                name="RepairDate"
                type="date"
                value={form.RepairDate ? dayjs(form.RepairDate).format('YYYY-MM-DD') : ''}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                name="Vendor"
                placeholder="保養廠"
                value={form.Vendor}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                name="RepairItem"
                placeholder="保養項目"
                value={form.RepairItem}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                name="RepairCode"
                placeholder="項目代碼"
                value={form.RepairCode}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                name="Quantity"
                type="number"
                placeholder="數量"
                value={form.Quantity}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                name="Amount"
                type="number"
                placeholder="金額"
                value={form.Amount}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                name="Mileage"
                type="number"
                placeholder="公里數"
                value={form.Mileage}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                儲存紀錄
              </button>
            </form>
          </div>

          {/* Method 2: File Upload */}
          <div className="p-4 bg-green-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">📁 檔案上傳</h3>
            <p className="text-sm text-gray-600 mb-2">上傳包含保養紀錄的 JSON 檔案</p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="mb-3"
            />
            {fileMessage && <p className="text-sm text-gray-700">{fileMessage}</p>}
          </div>

          {/* Method 3: JSON Paste */}
          <div className="p-4 bg-yellow-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">📋 貼上 JSON</h3>
            <p className="text-sm text-gray-600 mb-2">直接貼上 JSON 內容</p>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='貼上 JSON 內容，例如：[{"PlateNo":"0651-M6","RepairDate":"2023/04/07",...}]'
              className="w-full h-32 border rounded px-3 py-2 mb-3 resize-y"
            />
            <button
              onClick={handleJsonPaste}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
            >
              匯入 JSON
            </button>
            {jsonMessage && <p className="text-sm text-gray-700 mt-2">{jsonMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
}