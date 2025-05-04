import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
            filtered = filtered.filter(r => dayjs(r.RepairDate).isAfter(dayjs(filters.startDate), 'day'));
        }
        if (filters.endDate) {
            filtered = filtered.filter(r => dayjs(r.RepairDate).isBefore(dayjs(filters.endDate), 'day'));
        }
        if (filters.PlateNo) {
            filtered = filtered.filter(r => r.PlateNo === filters.PlateNo);
        }
        if (filters.RepairItem) {
            filtered = filtered.filter(r => r.RepairItem === filters.RepairItem);
        }
        setFiltered(filtered);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "\u4FDD\u990A\u7D00\u9304\u5217\u8868" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 print:hidden", children: [_jsx("input", { type: "date", name: "startDate", value: filters.startDate, onChange: handleChange, className: "border px-3 py-2 rounded" }), _jsx("input", { type: "date", name: "endDate", value: filters.endDate, onChange: handleChange, className: "border px-3 py-2 rounded" }), _jsxs("select", { name: "PlateNo", value: filters.PlateNo, onChange: handleChange, className: "border px-3 py-2 rounded", children: [_jsx("option", { value: "", children: "\u6240\u6709\u8ECA\u724C" }), cars.map((car) => (_jsx("option", { value: car.PlateNo, children: car.PlateNo }, car.id)))] }), _jsxs("select", { name: "RepairItem", value: filters.RepairItem, onChange: handleChange, className: "border px-3 py-2 rounded", children: [_jsx("option", { value: "", children: "\u6240\u6709\u4FDD\u990A\u9805\u76EE" }), allRepairItems.map((item, idx) => (_jsx("option", { value: item, children: item }, idx)))] }), _jsx("div", { className: "col-span-full", children: _jsx("button", { onClick: applyFilter, className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition", children: "\u641C\u5C0B" }) })] }), _jsxs("table", { className: "w-full border-collapse border text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100 text-left", children: [_jsx("th", { className: "border px-4 py-2", children: "\u65E5\u671F" }), _jsx("th", { className: "border px-4 py-2", children: "\u8ECA\u724C" }), _jsx("th", { className: "border px-4 py-2", children: "\u5EE0\u5546" }), _jsx("th", { className: "border px-4 py-2", children: "\u4FDD\u990A\u9805\u76EE" }), _jsx("th", { className: "border px-4 py-2", children: "\u9805\u76EE" }), _jsx("th", { className: "border px-4 py-2", children: "\u6578\u91CF" }), _jsx("th", { className: "border px-4 py-2", children: "\u91D1\u984D" }), _jsx("th", { className: "border px-4 py-2", children: "\u516C\u91CC\u6578" })] }) }), _jsx("tbody", { children: filtered.length > 0 ? (filtered.map((r, i) => (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "border px-4 py-2", children: dayjs(r.RepairDate).format('YYYY/MM/DD') }), _jsx("td", { className: "border px-4 py-2", children: r.PlateNo }), _jsx("td", { className: "border px-4 py-2", children: r.Vendor }), _jsx("td", { className: "border px-4 py-2", children: r.RepairItem }), _jsx("td", { className: "border px-4 py-2", children: r.RepairCode }), _jsx("td", { className: "border px-4 py-2 text-right", children: r.Quantity }), _jsx("td", { className: "border px-4 py-2 text-right", children: Number(r.Amount).toLocaleString() }), _jsx("td", { className: "border px-4 py-2 text-right", children: Number(r.Mileage).toLocaleString() })] }, i)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-4 text-gray-500", children: "\u67E5\u7121\u8CC7\u6599" }) })) })] })] }) }));
}
