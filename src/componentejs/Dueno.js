import React, { useState, useEffect } from 'react';
import { obtenerDuenos, crearDueno, borrarDueno } from './servicios';

const DuenoList = () => {
  const [duenos, setDuenos] = useState([]);

  useEffect(() => {
    obtenerDuenos()
      .then(data => setDuenos(data))
      .catch(error => console.error('Error al obtener la lista de dueños:', error));
  }, []);

  return (
    <div className='contenedor'>
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

    crearDueno(duenoData)
      .then(response => {
        console.log('Dueño creado:', response);
        // Puedes realizar alguna acción adicional después de crear el dueño
      })
      .catch(error => console.error('Error al crear el dueño:', error));
  };

  return (
    <div className='contenedor'>
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

const BorrarDueno = ({ id, onDelete }) => {
  const handleDelete = () => {
    borrarDueno(id)
      .then(response => {
        console.log('Dueño eliminado:', response);
        onDelete(); // Llama a la función onDelete proporcionada como prop
      })
      .catch(error => console.error('Error al borrar el dueño:', error));
  };

  return (
    <div className='contenedor'>
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
