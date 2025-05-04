import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageRouter from './router/index';
import SEO from './components/seo';
import './App.css';
import { useLocation } from 'react-router-dom';
const seoConfig = {
    '/': {
        title: '車健簿 | 愛車保養紀錄系統',
        description: '輕鬆記錄每次愛車的保養紀錄，掌握保養明細與歷史資料，打造屬於自己的線上車庫。',
    },
    '/list': {
        title: '車健簿 | 保養列表',
        description: '查看汽車保養列表。',
    },
    '/add': {
        title: '車健簿 | 新增保養紀錄',
        description: '新增車子保養紀錄。',
    },
    '/car-manager': {
        title: '車健簿 | 管理汽車資訊',
        description: '管理所有汽車資訊。',
    },
    // 其他路由...
};
function App() {
    const location = useLocation(); // 獲取當前路由資訊
    const currentPath = location.pathname; // 當前路徑
    // 根據當前路徑從 seoConfig 中獲取對應的 title 和 description
    const seoData = seoConfig[currentPath] || {
        title: 'Default Title',
        description: 'Default description for unmatched routes.',
    };
    return (_jsxs("div", { className: 'App', children: [_jsx(SEO, { title: seoData.title, description: seoData.description }), _jsx(PageRouter, {})] }));
}
export default App;
