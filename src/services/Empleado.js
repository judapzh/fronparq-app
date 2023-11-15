import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/empleado')
      .then(response => setEmpleados(response.data))
      .catch(error => console.error('Error fetching empleados:', error));
  }, []);

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <ul>
        {empleados.map(empleado => (
          <li key={empleado.id}>{empleado.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

const CrearEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [documentoIdentificacion, setDocumentoIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSubmit = () => {
    const empleadoData = {
      nombre,
      documentoIdentificacion,
      telefono,
      correo,
    };

    axios.post('http://localhost:8080/api/empleado', empleadoData)
      .then(response => {
        console.log('Empleado creado:', response.data);
        // Puedes realizar alguna acción adicional después de crear el empleado
      })
      .catch(error => console.error('Error al crear el empleado:', error));
  };

  return (
    <div>
      <h2>Crear Empleado</h2>
      <label>Nombre: </label>
      <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} /><br />
      <label>Documento de Identificación: </label>
      <input type="text" value={documentoIdentificacion} onChange={e => setDocumentoIdentificacion(e.target.value)} /><br />
      <label>Teléfono: </label>
      <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} /><br />
      <label>Correo: </label>
      <input type="text" value={correo} onChange={e => setCorreo(e.target.value)} /><br />
      <button onClick={handleSubmit}>Crear Empleado</button>
    </div>
  );
}

const BorrarEmpleado = ({ id }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/empleado/${id}`)
      .then(response => {
        console.log('Empleado eliminado:', response.data);
        // Puedes realizar alguna acción adicional después de eliminar el empleado
      })
      .catch(error => console.error('Error al borrar el empleado:', error));
  };

  return (
    <div>
      <h2>Borrar Empleado</h2>
      <button onClick={handleDelete}>Borrar Empleado</button>
    </div>
  );
}

export {
  EmpleadoList,
  CrearEmpleado,
  BorrarEmpleado
}
