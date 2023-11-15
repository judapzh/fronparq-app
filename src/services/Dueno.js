import React, { useState, useEffect } from 'react';
import axios from 'axios';  

const DuenoList = () => {
  const [duenos, setDuenos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/dueno')
      .then(response => setDuenos(response.data))
      .catch(error => console.error('Error fetching duenos:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Dueños</h2>
      <ul>
        {duenos.map(dueno => (
          <li key={dueno.id}>{dueno.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

const CrearDueno = () => {
  const [nombre, setNombre] = useState('');
  const [documentoIdentificacion, setDocumentoIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = () => {
    const duenoData = {
      nombre,
      documentoIdentificacion,
      telefono,
      correo,
    };

    axios.post('http://localhost:8080/api/dueno', duenoData)
      .then(response => {
        console.log('Dueño creado:', response.data);
        // Puedes realizar alguna acción adicional después de crear el dueño
      })
      .catch(error => console.error('Error al crear el dueño:', error));
  };

  return (
    <div>
      <h2>Crear Dueño</h2>
      <label>Nombre: </label>
      <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} /><br />
      <label>Documento de Identificación: </label>
      <input type="text" value={documentoIdentificacion} onChange={e => setDocumentoIdentificacion(e.target.value)} /><br />
      <label>Teléfono: </label>
      <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} /><br />
      <label>Correo: </label>
      <input type="text" value={correo} onChange={e => setCorreo(e.target.value)} /><br />
      <button onClick={handleSubmit}>Crear Dueño</button>
    </div>
  );
}

const BorrarDueno = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/dueno/${id}`)
      .then(response => {
        console.log('Dueño eliminado:', response.data);
        // Puedes realizar alguna acción adicional después de eliminar el dueño
      })
      .catch(error => console.error('Error al borrar el dueño:', error));
  };

  return (
    <div>
      <h2>Borrar Dueño</h2>
      <button onClick={handleDelete}>Borrar Dueño</button>
    </div>
  );
}

export {
  DuenoList,
  CrearDueno,
  BorrarDueno
}
