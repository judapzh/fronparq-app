import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MarcaList = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/marca')
      .then(response => setMarcas(response.data))
      .catch(error => console.error('Error fetching marcas:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Marcas</h2>
      <ul>
        {marcas.map(marca => (
          <li key={marca.id}>{marca.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

const CrearMarca = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/marca', { nombre })
      .then(response => {
        console.log('Marca creada:', response.data);
        // Puedes realizar alguna acción adicional después de crear la marca
      })
      .catch(error => console.error('Error al crear la marca:', error));
  };

  return (
    <div>
      <h2>Crear Marca</h2>
      <label>Nombre: </label>
      <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
      <button onClick={handleSubmit}>Crear Marca</button>
    </div>
  );
}

const BorrarMarca = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/marca/${id}`)
      .then(response => {
        console.log('Marca eliminada:', response.data);
        // Puedes realizar alguna acción adicional después de eliminar la marca
      })
      .catch(error => console.error('Error al borrar la marca:', error));
  };

  return (
    <div>
      <h2>Borrar Marca</h2>
      <button onClick={handleDelete}>Borrar Marca</button>
    </div>
  );
}


export {
    MarcaList,
    CrearMarca,
    BorrarMarca
}
