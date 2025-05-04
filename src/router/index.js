import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import HomePage from '../pages/Index';
import AddPage from '../pages/AddPage';
import ListPage from '../pages/ListPage';
import CarManager from '../pages/CarManager';
import { Routes, Route, } from 'react-router-dom';
export default function PageRouter() {
    return (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { element: _jsx(HomePage, {}), path: '/' }), _jsx(Route, { element: _jsx(AddPage, {}), path: '/add' }), _jsx(Route, { element: _jsx(ListPage, {}), path: '/list' }), _jsx(Route, { element: _jsx(CarManager, {}), path: '/car-manager' })] }) }));
}
