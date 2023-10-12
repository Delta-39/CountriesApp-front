import './App.css'; 
import { Route, Routes, useLocation } from 'react-router-dom'; 
import routesHelper from './helpers/routes'; 
import LandingPage from './views/Landing Page/LandingPage'; 
import Home from './views/Home/Home'; 
import Nav from './components/Nav/Nav'; 
import Detail from './views/Detail/Detail'; 
import Form from './components/Form/Form'; 
import Activities from './views/Activities/Activities';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const location = useLocation(); //* Obtiene la ubicación actual del enrutador
  const isLocationLanding = location.pathname !== '/'; //* Verifica si la ubicación no es la página de inicio

  return (
    <>
      {isLocationLanding ? <Nav /> : null} {/* Renderiza el componente de navegación si no está en la página de inicio */}
      <ToastContainer
              position="top-left" 
              autoClose={5000} 
              closeOnClick 
              pauseOnHover
              limit={2}
      />
      <Routes>
        <Route path={routesHelper.landing} element={<LandingPage />} /> 
        <Route path={routesHelper.home} element={<Home />} /> 
        <Route path={routesHelper.detail} element={<Detail />} /> 
        <Route path={routesHelper.createActivity} element={<Form />} /> 
        <Route path={routesHelper.activities} element={<Activities />} /> 
      </Routes>
    </>
  );
}

export default App; 
