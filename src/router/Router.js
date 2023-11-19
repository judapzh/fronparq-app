import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { DuenoList, CrearDueno } from '../componentejs/Dueno';
import { EstanciaList, CrearEstancia } from '../componentejs/Estancias';
import { MarcaList, CrearMarca } from '../componentejs/Marcas';
import { TipoVehiculoList, CrearTipoVehiculo } from '../componentejs/TipoVehiculos';
import { EmpleadoList, CrearEmpleado } from '../componentejs/Empleado';
import { CrearVehiculo, VehiculoList } from '../componentejs/vehiculos';
import { PagoList, CrearPago } from '../componentejs/Pago';  
import { CeldaList, CrearCelda } from '../componentejs/Celda';
import HeaderComconent from '../components/HeaderComponent';
import NotFound from '../components/NotFound';
import Footer from '../components/footer';

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderComconent />
        <div className='container'>
          <Router>
            <Routes>
              {/* Rutas para el componente celdas */}
              <Route path="/celdas" element={<CeldaList />} />
              <Route path="/crear-celda" element={<CrearCelda />} />
              <Route path="/editar-celda/:id" element={<CrearCelda />} />

              {/* Rutas para el componente dueño*/}
              <Route path="/duenos" element={<DuenoList />} />
              <Route path="/crear-dueno" element={<CrearDueno />} />
              <Route path="/editar-dueno/:id" element={<CrearDueno />} />

              {/* Rutas para el componente Estancia */}
              <Route path="/estancias" element={<EstanciaList />} />
              <Route path="/crear-estancia" element={<CrearEstancia />} />
              <Route path="/generar-salida/:id" element={<CrearEstancia />} />

              {/* Rutas para el componente Marca */}
              <Route path="/marcas" element={<MarcaList />} />
              <Route path="/crear-marca" element={<CrearMarca />} />
              <Route path="/editar-marca/:id" element={<CrearMarca />} />

              {/* Rutas para el componente TipoVehiculo */}
              <Route path="/tipos-vehiculo" element={<TipoVehiculoList />} />
              <Route path="/crear-tipo-vehiculo" element={<CrearTipoVehiculo />} />
              <Route path="/editar-tipo-vehiculo/:id" element={<CrearTipoVehiculo />} />

              {/* Rutas para el componente Empleado */}
              <Route path="/empleados" element={<EmpleadoList />} />
              <Route path="/crear-empleado" element={<CrearEmpleado />} />
              <Route path="/editar-empleado/:id" element={<CrearEmpleado />} />

              {/* Rutas para el componente Vehiculo */}
              <Route path="/vehiculos" element={<VehiculoList />} />
              <Route path="/crear-vehiculo" element={<CrearVehiculo />} />
              <Route path="/editar-vehiculo/:id" element={<CrearVehiculo />} />

              {/* Rutas para el componente Pagos */}
              <Route path="/pagos" element={<PagoList />} />
              <Route path="/crear-pago" element={<CrearPago />} />
              <Route path="/editar-pago/:id" element={<CrearPago />} />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
