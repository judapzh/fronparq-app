import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import EstanciaServer from '../servicios/estanciaserver';

const EstanciaList = () => {
  const [estancias, setEstancias] = useState([]);

  useEffect(() => {
    listarEstancia();
  }, []);

  const listarEstancia = () => {
    EstanciaServer.getAllEstancias()
      .then(response => {
        setEstancias(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteEstancia = (estanciaId) => {
    EstanciaServer.deleteEstancia(estanciaId)
      .then(() => {
        listarEstancia();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Estancias</h2>
      <Link to='crearEstancia' className='btn btn-primary mb-2'>
        Agregar una estancia
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Fecha Entrada</th>
            <th>Fecha Salida</th>
            <th>Fk Vehiculo</th>
            <th>Fk Celda</th>
            <th>Minutos Totales</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estancias.map((estancia) => (
            <tr key={estancia.id}>
              <td>{estancia.id}</td>
              <td>{estancia.fecha_entrada}</td>
              <td>{estancia.fecha_salida}</td>
              <td>{estancia.fk_vehiculo}</td>
              <td>{estancia.fk_celda}</td>
              <td>{estancia.minutos_totales}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-estancia/${estancia.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deleteEstancia(estancia.id)}
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

const CrearEstancia = () => {
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [fkVehiculo, setFkVehiculo] = useState('');
  const [fkCelda, setFkCelda] = useState('');
  const [minutosTotales, setMinutosTotales] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the data for the given ID and populate the form fields
      EstanciaServer.getEstanciaById(id)
        .then(response => {
          const data = response.data;
          setFechaEntrada(data.fecha_entrada);
          setFechaSalida(data.fecha_salida);
          setFkVehiculo(data.fk_vehiculo);
          setFkCelda(data.fk_celda);
          setMinutosTotales(data.minutos_totales);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveEstancia = (e) => {
    e.preventDefault();
    const estancia = { fecha_entrada: fechaEntrada, fecha_salida: fechaSalida, fk_vehiculo: fkVehiculo, fk_celda: fkCelda, minutos_totales: minutosTotales };

    if (id) {
      EstanciaServer.updateEstancia(id, estancia)
        .then(() => {
          console.log('Estancia updated successfully');
          navigate('/estancias');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      EstanciaServer.createEstancia(estancia)
        .then(() => {
          console.log('Estancia created successfully');
          navigate('/estancias');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar estancia</h2>;
    } else {
      return <h2 className='text-center'>Agregar estancia</h2>;
    }
  };

  return (
    <div className='container'>
      <div className='card col-md-6 offset-md-3 offset-md-3'>
        {title()}
        <div className='card-body'>
          <form>
            <div className='form-group-md-2'>
              <label>Fecha Entrada: </label>
              <input type="text" value={fechaEntrada} onChange={(e) => setFechaEntrada(e.target.value)} /><br />
              <label>Fecha Salida: </label>
              <input type="text" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} /><br />
              <label>Fk Vehiculo: </label>
              <input type="text" value={fkVehiculo} onChange={(e) => setFkVehiculo(e.target.value)} /><br />
              <label>Fk Celda: </label>
              <input type="text" value={fkCelda} onChange={(e) => setFkCelda(e.target.value)} /><br />
              <label>Minutos Totales: </label>
              <input type="text" value={minutosTotales} onChange={(e) => setMinutosTotales(e.target.value)} /><br />
              <button className='btn btn-success' onClick={(e) => saveEstancia(e)}>Crear Estancia</button>
              &nbsp;&nbsp;
              <Link to='/estancias' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { EstanciaList, CrearEstancia };
