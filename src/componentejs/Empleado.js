import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import EmpleadoServer from '../servicios/empleadoserver';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    listarEmpleado();
  }, []);

  const listarEmpleado = () => {
    EmpleadoServer.getAllEmpleados()
      .then(response => {
        setEmpleados(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteEmpleado = (empleadoId) => {
    EmpleadoServer.deleteEmpleado(empleadoId)
      .then(() => {
        listarEmpleado();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Empleados</h2>
      <Link to='crearEmpleado' className='btn btn-primary mb-2'>
        Agregar un empleado
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Documento_identificacion</th>
            <th>Telefono</th>
            <th>Correo</th>
           
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.documento_identificacion}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.correo}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-empleado/${empleado.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deleteEmpleado(empleado.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CrearEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [documentoIdentificacion, setDocumentoIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the data for the given ID and populate the form fields
      EmpleadoServer.getEmpleadoById(id)
        .then(response => {
          const data = response.data;
          setNombre(data.nombre);
          setDocumentoIdentificacion(data.documento_identificacion);
          setTelefono(data.telefono);
          setCorreo(data.correo);
          setContrasena(data.contrasena)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveEmpleado = (e) => {
    e.preventDefault();
    const empleado = { nombre, documento_identificacion: documentoIdentificacion, telefono, correo };

    if (id) {
      EmpleadoServer.updateEmpleado(id, empleado)
        .then(() => {
          console.log('Empleado updated successfully');
          navigate('/empleados');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      EmpleadoServer.createEmpleado(empleado)
        .then(() => {
          console.log('Empleado created successfully');
          navigate('/empleados');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar empleado</h2>;
    } else {
      return <h2 className='text-center'>Agregar empleado</h2>;
    }
  };

  return (
    <div className='container'>
      <div className='card col-md-6 offset-md-3 offset-md-3'>
        {title()}
        <div className='card-body'>
          <form>
            <div className='form-group-md-2'>
              <label>Nombre: </label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br />
              <label>Documento de Identificación: </label>
              <input type="text" value={documentoIdentificacion} onChange={(e) => setDocumentoIdentificacion(e.target.value)} /><br />
              <label>Teléfono: </label>
              <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} /><br />
              <label>Correo: </label>
              <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} /><br />
              <label>Contraseña: </label>
              <input type="text" value={contrasena} onChange={(e) => setContrasena(e.target.value)} /><br />
              <button className='btn btn-success' onClick={(e) => saveEmpleado(e)}>Crear Empleado</button>
              &nbsp;&nbsp;
              <Link to='/empleados' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { EmpleadoList, CrearEmpleado };
