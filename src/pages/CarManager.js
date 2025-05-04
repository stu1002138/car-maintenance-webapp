import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\u7BA1\u7406\u6C7D\u8ECA\u8CC7\u8A0A" }), _jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsx("input", { name: "PlateNo", placeholder: "\u8ECA\u724C\u865F\u78BC", value: form.PlateNo, onChange: handleChange, required: true, className: "border rounded px-3 py-2" }), _jsx("input", { name: "Brand", placeholder: "\u5EE0\u724C", value: form.Brand, onChange: handleChange, required: true, className: "border rounded px-3 py-2" }), _jsx("input", { name: "LastRepairDate", placeholder: "\u4E0A\u6B21\u4FDD\u990A\u65E5\u671F (\u4F8B\uFF1A2024/04/01)", value: form.LastRepairDate, onChange: handleChange, required: true, className: "border rounded px-3 py-2" }), _jsx("div", { className: "col-span-full", children: _jsx("button", { type: "submit", className: "bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition", children: "\u5132\u5B58\u8ECA\u8F1B\u8CC7\u8A0A" }) })] }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: "\u5DF2\u767B\u9304\u8ECA\u8F1B" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "p-2 border", children: "\u8ECA\u724C\u865F\u78BC" }), _jsx("th", { className: "p-2 border", children: "\u5EE0\u724C" }), _jsx("th", { className: "p-2 border", children: "\u4E0A\u6B21\u4FDD\u990A\u65E5\u671F" })] }) }), _jsx("tbody", { children: cars.map((car) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "p-2 border", children: car.PlateNo }), _jsx("td", { className: "p-2 border", children: car.Brand }), _jsx("td", { className: "p-2 border", children: car.LastRepairDate })] }, car.id))) })] }) })] }) }));
}
