import HomePage from '../pages/Index';
import AddPage from '../pages/AddPage';
import ListPage from '../pages/ListPage';
import CarManager from '../pages/CarManager';
import {
  Routes,
  Route,
} from 'react-router-dom'



export default function PageRouter() {
  
  return (
    <>
      {/* <Index /> */}
      <Routes>
          <Route element={<HomePage />} path={'/'}></Route>
          <Route element={<AddPage />} path='/add'></Route>
          <Route element={<ListPage />} path='/list'></Route>
          <Route element={<CarManager />} path='/car-manager'></Route>
      </Routes>
    </>
  );
}