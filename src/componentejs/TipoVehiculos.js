
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TipoVehiculoList = () => {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/tvehiculo')
      .then(response => setTipos(response.data))
      .catch(error => console.error('Error fetching tipos de vehículos:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Tipos de Vehículos</h2>
      <ul>
        {tipos.map(tipo => (
          <li key={tipo.id}>{tipo.tipo}</li>
        ))}
      </ul>
    </div>
  );
}




const CrearTipoVehiculo = () => {
  const [tipo, setTipo] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/tvehiculo', { tipo })
      .then(response => {
        console.log('Tipo de vehículo creado:', response.data);
        // Puedes realizar alguna acción adicional después de crear el tipo de vehículo
      })
      .catch(error => console.error('Error al crear el tipo de vehículo:', error));
  };

  return (
    <div>
      <h2>Crear Tipo de Vehículo</h2>
      <label>Tipo: </label>
      <input type="text" value={tipo} onChange={e => setTipo(e.target.value)} />
      <button onClick={handleSubmit}>Crear Tipo de Vehículo</button>
    </div>
  );
}


const BorrarTipoVehiculo = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/tvehiculo/${id}`)
      .then(response => {
        console.log('Tipo de vehículo eliminado:', response.data);
        // Puedes realizar alguna acción adicional después de eliminar el tipo de vehículo
      })
      .catch(error => console.error('Error al borrar el tipo de vehículo:', error));
  };

  return (
    <div>
      <h2>Borrar Tipo de Vehículo</h2>
      <button onClick={handleDelete}>Borrar Tipo de Vehículo</button>
    </div>
  );
}


export {
    TipoVehiculoList,
    CrearTipoVehiculo,
    BorrarTipoVehiculo
}