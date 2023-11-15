import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DuenoList, CrearDueno, BorrarDueno } from '../services/Dueno';
import { EstanciaList, CrearEstancia, GenerarSalidaEstancia, BorrarEstancia } from '../services/Estancias';
import { MarcaList, CrearMarca, BorrarMarca } from '../services/Marcas';
import { TipoVehiculoList, CrearTipoVehiculo, BorrarTipoVehiculo } from '../services/TipoVehiculos';
import { EmpleadoList, CrearEmpleado, BorrarEmpleado } from '../services/Empleado';
import { CrearVehiculo, VehiculoList, BorrarVehiculo } from '../services/vehiculos';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        {/* Rutas para el componente Dueno */}
        <Route path="/duenos" exact component={DuenoList} />
        <Route path="/crear-dueno" exact component={CrearDueno} />
        <Route path="/borrar-dueno/:id" exact component={BorrarDueno} />
    

         {/* Rutas para el componente Estancia */}
        <Route path="/estancias" exact component={EstanciaList} />
        <Route path="/crear-estancia" exact component={CrearEstancia} />
        <Route path="/generar-salida/:id" exact component={GenerarSalidaEstancia} />
        <Route path="/borrar-estancia/:id" exact component={BorrarEstancia} />
   

        {/* Rutas para el componente Marca */}
        <Route path="/marcas" exact component={MarcaList} />
        <Route path="/crear-marca" exact component={CrearMarca} />
        <Route path="/borrar-marca/:id" exact component={BorrarMarca} />
    

          {/* Rutas para el componente TipoVehiculo */}
        <Route path="/tipos-vehiculo" exact component={TipoVehiculoList} />
        <Route path="/crear-tipo-vehiculo" exact component={CrearTipoVehiculo} />
        <Route path="/borrar-tipo-vehiculo/:id" exact component={BorrarTipoVehiculo} />
    

           {/* Rutas para el componente Empleado */}
        <Route path="/empleados" exact component={EmpleadoList} />
        <Route path="/crear-empleado" exact component={CrearEmpleado} />
        <Route path="/borrar-empleado/:id" exact component={BorrarEmpleado} />
    

          {/* Rutas para el componente Vehiculo */}
        <Route path="/vehiculos" exact component={VehiculoList} />
        <Route path="/crear-vehiculo" exact component={CrearVehiculo} />
        <Route path="/borrar-vehiculo/:id" exact component={BorrarVehiculo} />
      </Switch>
     
    </Router>
  );
}

export default AppRouter;
