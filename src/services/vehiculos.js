import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosConfig } from '../axiosConfig';

const VehiculoList = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/vehiculo', axiosConfig)
      .then(response => setVehiculos(response.data))
      .catch(error => console.error('Error fetching vehículos:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Vehículos</h2>
      <ul>
        {vehiculos.map(vehiculo => (
          <li key={vehiculo.id}>{vehiculo.placa}</li>
        ))}
      </ul>
    </div>
  );
}

const CrearVehiculo = () => {
  const [placa, setPlaca] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [duenoId, setDuenoId] = useState('');

  const handleSubmit = () => {
    const vehiculoData = {
      placa,
      tipoVehiculo: { id: tipoId },
      marca: { id: marcaId },
      dueno: { id: duenoId },
    };

    axios.post('http://localhost:8080/api/vehiculo', vehiculoData, axiosConfig)
      .then(response => {
        console.log('Vehículo creado:', response.data);
        // Puedes realizar alguna acción adicional después de crear el vehículo
      })
      .catch(error => console.error('Error al crear el vehículo:', error));
  };

  return (
    <div>
      <h2>Crear Vehículo</h2>
      <label>Placa: </label>
      <input type="text" value={placa} onChange={e => setPlaca(e.target.value)} /><br />
      <label>Tipo ID: </label>
      <input type="text" value={tipoId} onChange={e => setTipoId(e.target.value)} /><br />
      <label>Marca ID: </label>
      <input type="text" value={marcaId} onChange={e => setMarcaId(e.target.value)} /><br />
      <label>Dueno ID: </label>
      <input type="text" value={duenoId} onChange={e => setDuenoId(e.target.value)} /><br />
      <button onClick={handleSubmit}>Crear Vehículo</button>
    </div>
  );
}

const BorrarVehiculo = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/vehiculo/${id}`, axiosConfig)
      .then(response => {
        console.log('Vehículo eliminado:', response.data);
        // Puedes realizar alguna acción adicional después de eliminar el vehículo
      })
      .catch(error => console.error('Error al borrar el vehículo:', error));
  };

  return (
    <div>
      <h2>Borrar Vehículo</h2>
      <button onClick={handleDelete}>Borrar Vehículo</button>
    </div>
  );
}

export {
  CrearVehiculo,
  VehiculoList,
  BorrarVehiculo
}
