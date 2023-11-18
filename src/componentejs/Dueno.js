import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DuenoServer from '../servicios/duenoServer';

const DuenoList = () => {
  const [duenos, setDuenos] = useState([]);

  useEffect(() => {
    listardueno();
  }, []);

  const listardueno = () => {
    DuenoServer.getAllduenos()
      .then(response => {
        setDuenos(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteDueno = (duenoId) => {
    DuenoServer.deleteDueno(duenoId)
      .then(() => {
        listardueno();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Dueños</h2>
      <Link to='crearDueno' className='btn btn-primary mb-2'>
        Agregar un dueño
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
          {duenos.map((dueno) => (
            <tr key={dueno.id}>
              <td>{dueno.id}</td>
              <td>{dueno.nombre}</td>
              <td>{dueno.documento_identificacion}</td>
              <td>{dueno.telefono}</td>
              <td>{dueno.correo}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-dueno/${dueno.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deleteDueno(dueno.id)}
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

const CrearDueno = () => {
  const [nombre, setNombre] = useState('');
  const [documentoIdentificacion, setDocumentoIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the data for the given ID and populate the form fields
      DuenoServer.getDuenoById(id)
        .then(response => {
          const data = response.data;
          setNombre(data.nombre);
          setDocumentoIdentificacion(data.documento_identificacion);
          setTelefono(data.telefono);
          setCorreo(data.correo);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveDueno = (e) => {
    e.preventDefault();
    const dueno = { nombre, documento_identificacion: documentoIdentificacion, telefono, correo };

    if (id) {
      DuenoServer.updateDueno(id, dueno)
        .then(() => {
          console.log('Dueno updated successfully');
          navigate('/duenos');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      DuenoServer.createDueno(dueno)
        .then(() => {
          console.log('Dueno created successfully');
          navigate('/duenos');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar dueño</h2>;
    } else {
      return <h2 className='text-center'>Agregar dueño</h2>;
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
              <button className='btn btn-success' onClick={(e) => saveDueno(e)}>Crear Dueño</button>
              &nbsp;&nbsp;
              <Link to='/duenos' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { DuenoList, CrearDueno };

