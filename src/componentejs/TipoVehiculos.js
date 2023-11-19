import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import tipovehiculoServer from '../servicios/tiposerver';

const TipoVehiculoList = () => {
  const [tiposVehiculo, setTiposVehiculo] = useState([]);

  useEffect(() => {
    listarTipoVehiculo();
  }, []);

  const listarTipoVehiculo = () => {
    tipovehiculoServer.getAllTiposVehiculo()
      .then(response => {
        setTiposVehiculo(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteTipoVehiculo = (tipoVehiculoId) => {
    tipovehiculoServer.deleteTipoVehiculo(tipoVehiculoId)
      .then(() => {
        listarTipoVehiculo();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Tipos de Vehículo</h2>
      <Link to='crearTipoVehiculo' className='btn btn-primary mb-2'>
        Agregar un tipo de vehículo
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposVehiculo.map((tipoVehiculo) => (
            <tr key={tipoVehiculo.id}>
              <td>{tipoVehiculo.id}</td>
              <td>{tipoVehiculo.tipo}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-tipo-vehiculo/${tipoVehiculo.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deleteTipoVehiculo(tipoVehiculo.id)}
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

const CrearTipoVehiculo = () => {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the data for the given ID and populate the form fields
      tipovehiculoServer.getTipoVehiculoById(id)
        .then(response => {
          const data = response.data;
          setNombre(data.nombre);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveTipoVehiculo = (e) => {
    e.preventDefault();
    const tipoVehiculo = { nombre };

    if (id) {
      tipovehiculoServer.updateTipoVehiculo(id, tipoVehiculo)
        .then(() => {
          console.log('Tipo de vehículo actualizado exitosamente');
          navigate('/tipos-vehiculo');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      tipovehiculoServer.createTipoVehiculo(tipoVehiculo)
        .then(() => {
          console.log('Tipo de vehículo creado exitosamente');
          navigate('/tipos-vehiculo');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar tipo de vehículo</h2>;
    } else {
      return <h2 className='text-center'>Agregar tipo de vehículo</h2>;
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
              <button className='btn btn-success' onClick={(e) => saveTipoVehiculo(e)}>Crear Tipo de Vehículo</button>
              &nbsp;&nbsp;
              <Link to='/tipos-vehiculo' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { TipoVehiculoList, CrearTipoVehiculo };
