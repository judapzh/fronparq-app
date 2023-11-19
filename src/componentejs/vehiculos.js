import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import VehiculoServer from '../servicios/vehiculoserver';

const VehiculoList = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    listarVehiculo();
  }, []);

  const listarVehiculo = () => {
    VehiculoServer.getAllVehiculos()
      .then(response => {
        setVehiculos(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteVehiculo = (vehiculoId) => {
    VehiculoServer.deleteVehiculo(vehiculoId)
      .then(() => {
        listarVehiculo();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Vehiculos</h2>
      <Link to='crearVehiculo' className='btn btn-primary mb-2'>
        Agregar un vehiculo
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Placa</th>
            <th>Fk Tipo Vehiculo</th>
            <th>Fk Marca</th>
            <th>Fk Dueno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.fk_tipo_vehiculo}</td>
              <td>{vehiculo.fk_marca}</td>
              <td>{vehiculo.fk_dueno}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-vehiculo/${vehiculo.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deleteVehiculo(vehiculo.id)}
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

const CrearVehiculo = () => {
  const [placa, setPlaca] = useState('');
  const [fkTipoVehiculo, setFkTipoVehiculo] = useState('');
  const [fkMarca, setFkMarca] = useState('');
  const [fkDueno, setFkDueno] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      
      VehiculoServer.getVehiculoById(id)
        .then(response => {
          const data = response.data;
          setPlaca(data.placa);
          setFkTipoVehiculo(data.fk_tipo_vehiculo);
          setFkMarca(data.fk_marca);
          setFkDueno(data.fk_dueno);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveVehiculo = (e) => {
    e.preventDefault();
    const vehiculo = { placa, fk_tipo_vehiculo: fkTipoVehiculo, fk_marca: fkMarca, fk_dueno: fkDueno };

    if (id) {
      VehiculoServer.updateVehiculo(id, vehiculo)
        .then(() => {
          console.log('Vehiculo updated successfully');
          navigate('/vehiculos');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      VehiculoServer.createVehiculo(vehiculo)
        .then(() => {
          console.log('Vehiculo created successfully');
          navigate('/vehiculos');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar vehiculo</h2>;
    } else {
      return <h2 className='text-center'>Agregar vehiculo</h2>;
    }
  };

  return (
    <div className='container'>
      <div className='card col-md-6 offset-md-3 offset-md-3'>
        {title()}
        <div className='card-body'>
          <form>
            <div className='form-group-md-2'>
              <label>Placa: </label>
              <input type="text" value={placa} onChange={(e) => setPlaca(e.target.value)} /><br />
              <label> Tipo Vehiculo: </label>
              <input type="text" value={fkTipoVehiculo} onChange={(e) => setFkTipoVehiculo(e.target.value)} /><br />
              <label> Marca: </label>
              <input type="text" value={fkMarca} onChange={(e) => setFkMarca(e.target.value)} /><br />
              <label>Dueno: </label>
              <input type="text" value={fkDueno} onChange={(e) => setFkDueno(e.target.value)} /><br />
              <button className='btn btn-success' onClick={(e) => saveVehiculo(e)}>Crear Vehiculo</button>
              &nbsp;&nbsp;
              <Link to='/vehiculos' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { VehiculoList, CrearVehiculo };

