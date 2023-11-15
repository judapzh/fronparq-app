import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EstanciaList = () => {
  const [estancias, setEstancias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/estancia')
      .then(response => setEstancias(response.data))
      .catch(error => console.error('Error fetching estancias:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Estancias</h2>
      <ul>
        {estancias.map(estancia => (
          <li key={estancia.id}>{estancia.fechaEntrada}</li>
        ))}
      </ul>
    </div>
  );
}



const CrearEstancia = () => {
  const [vehiculoId, setVehiculoId] = useState('');

  const handleSubmit = () => {
    const estanciaData = { vehiculo: { id: vehiculoId } };

    axios.post('http://localhost:8080/api/estancia/entrada', estanciaData)
      .then(response => {
        console.log('Estancia creada:', response.data);
        // Puedes realizar alguna acción adicional después de crear la estancia
      })
      .catch(error => console.error('Error al crear la estancia:', error));
  };

  return (
    <div>
      <h2>Crear Estancia</h2>
      <label>Vehículo ID: </label>
      <input type="text" const value={vehiculoId} onChange={e => setVehiculoId(e.target.value)} /><br />
      <button onClick={handleSubmit}>Crear Estancia</button>
    </div>
  );
}

const GenerarSalidaEstancia = ({ id }) => {
  const handleGenerateExit = () => {
    axios.post(`http://localhost:8080/api/estancia/salida/${id}`)
      .then(response => {
        console.log('Salida de estancia generada:', response.data);
        // Puedes realizar alguna acción adicional después de generar la salida de la estancia
      })
      .catch(error => console.error('Error al generar la salida de la estancia:', error));
  };

  return (
    <div>
      <h2>Generar Salida de Estancia</h2>
      <button onClick={handleGenerateExit}>Generar Salida de Estancia</button>
    </div>
  );
}

const BorrarEstancia = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/estancia/${id}`)
      .then(response => {
        console.log('Estancia eliminada:', response.data);
        // Puedes realizar alguna acción adicional después de eliminar la estancia
      })
      .catch(error => console.error('Error al borrar la estancia:', error));
  };

  return (
    <div>
      <h2>Borrar Estancia</h2>
      <button onClick={handleDelete}>Borrar Estancia</button>
    </div>
  );
}

export {
  BorrarEstancia,
  GenerarSalidaEstancia,
  CrearEstancia,
  EstanciaList
}