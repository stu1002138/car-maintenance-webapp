import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { db } from '../utils/db';
import dayjs from 'dayjs';
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
    const [cars, setCars] = useState([]);
    const [fileMessage, setFileMessage] = useState('');
    const [jsonMessage, setJsonMessage] = useState('');
    const [jsonInput, setJsonInput] = useState('');
    useEffect(() => {
        const loadCars = async () => {
            const allCars = await db.table('cars').toArray();
            setCars(allCars);
        };
        loadCars();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'RepairDate') {
            const formattedDate = value ? dayjs(value).format('YYYY/MM/DD') : '';
            setForm((prev) => ({ ...prev, [name]: formattedDate }));
        }
        else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            if (!Array.isArray(data)) {
                setFileMessage('❌ JSON 格式錯誤，必須為陣列');
                return;
            }
            const requiredFields = ['PlateNo', 'Vendor', 'RepairItem', 'RepairCode', 'Quantity', 'Amount', 'Mileage', 'RepairDate'];
            const valid = data.every(item => requiredFields.every(field => field in item));
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
        }
        catch (err) {
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
            const valid = data.every(item => requiredFields.every(field => field in item));
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
        }
        catch (err) {
            console.error(err);
            setJsonMessage('❌ 匯入失敗，請檢查 JSON 內容是否正確');
        }
    };
    const handleSubmit = async (e) => {
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
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: "\u65B0\u589E\u4FDD\u990A\u7D00\u9304" }), _jsx("p", { className: "text-gray-600 mb-8 text-center", children: "\u9078\u64C7\u4EE5\u4E0B\u4E09\u7A2E\u65B9\u5F0F\u4E4B\u4E00\u4F86\u65B0\u589E\u4FDD\u990A\u7D00\u9304" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "p-4 bg-blue-50 rounded-lg shadow", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "\uD83D\uDCDD \u55AE\u7B46\u8F38\u5165" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3", children: [_jsxs("select", { name: "PlateNo", value: form.PlateNo, onChange: handleChange, required: true, className: "border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "\u9078\u64C7\u8ECA\u724C\u865F\u78BC" }), cars.map((car) => (_jsxs("option", { value: car.PlateNo, children: [car.PlateNo, "\uFF08", car.Brand, "\uFF09"] }, car.id)))] }), _jsx("input", { name: "RepairDate", type: "date", value: form.RepairDate ? dayjs(form.RepairDate).format('YYYY-MM-DD') : '', onChange: handleChange, required: true, className: "border rounded px-3 py-2" }), _jsx("input", { name: "Vendor", placeholder: "\u4FDD\u990A\u5EE0", value: form.Vendor, onChange: handleChange, className: "border rounded px-3 py-2" }), _jsx("input", { name: "RepairItem", placeholder: "\u4FDD\u990A\u9805\u76EE", value: form.RepairItem, onChange: handleChange, className: "border rounded px-3 py-2" }), _jsx("input", { name: "RepairCode", placeholder: "\u9805\u76EE\u4EE3\u78BC", value: form.RepairCode, onChange: handleChange, className: "border rounded px-3 py-2" }), _jsx("input", { name: "Quantity", type: "number", placeholder: "\u6578\u91CF", value: form.Quantity, onChange: handleChange, className: "border rounded px-3 py-2" }), _jsx("input", { name: "Amount", type: "number", placeholder: "\u91D1\u984D", value: form.Amount, onChange: handleChange, className: "border rounded px-3 py-2" }), _jsx("input", { name: "Mileage", type: "number", placeholder: "\u516C\u91CC\u6578", value: form.Mileage, onChange: handleChange, className: "border rounded px-3 py-2" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition", children: "\u5132\u5B58\u7D00\u9304" })] })] }), _jsxs("div", { className: "p-4 bg-green-50 rounded-lg shadow", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "\uD83D\uDCC1 \u6A94\u6848\u4E0A\u50B3" }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: "\u4E0A\u50B3\u5305\u542B\u4FDD\u990A\u7D00\u9304\u7684 JSON \u6A94\u6848" }), _jsx("input", { type: "file", accept: ".json", onChange: handleFileUpload, className: "mb-3" }), fileMessage && _jsx("p", { className: "text-sm text-gray-700", children: fileMessage })] }), _jsxs("div", { className: "p-4 bg-yellow-50 rounded-lg shadow", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "\uD83D\uDCCB \u8CBC\u4E0A JSON" }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: "\u76F4\u63A5\u8CBC\u4E0A JSON \u5167\u5BB9" }), _jsx("textarea", { value: jsonInput, onChange: (e) => setJsonInput(e.target.value), placeholder: '\u8CBC\u4E0A JSON \u5167\u5BB9\uFF0C\u4F8B\u5982\uFF1A[{"PlateNo":"0651-M6","RepairDate":"2023/04/07",...}]', className: "w-full h-32 border rounded px-3 py-2 mb-3 resize-y" }), _jsx("button", { onClick: handleJsonPaste, className: "bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition", children: "\u532F\u5165 JSON" }), jsonMessage && _jsx("p", { className: "text-sm text-gray-700 mt-2", children: jsonMessage })] })] })] }) }));
}
