import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CeldaServer from '../servicios/celdaserver';

const CeldaList = () => {
  const [celdas, setCeldas] = useState([]);

  useEffect(() => {
    listarCelda();
  }, []);

  const listarCelda = () => {
    CeldaServer.getAllCeldas()
      .then(response => {
        setCeldas(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteCelda = (celdaId) => {
    CeldaServer.deleteCelda(celdaId)
      .then(() => {
        listarCelda();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Celdas</h2>
      <Link to='crearCelda' className='btn btn-primary mb-2'>
        Agregar una celda
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Ocupada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {celdas.map((celda) => (
            <tr key={celda.id}>
              <td>{celda.id}</td>
              <td>{celda.nombre}</td>
              <td>{celda.ocupada}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-celda/${celda.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deleteCelda(celda.id)}
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

const CrearCelda = () => {
  const [nombre, setNombre] = useState('');
  const [ocupada, setOcupada] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      
      CeldaServer.getCeldaById(id)
        .then(response => {
          const data = response.data;
          setNombre(data.nombre);
          setOcupada(data.ocupada);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveCelda = (e) => {
    e.preventDefault();
    const celda = { nombre, ocupada };

    if (id) {
      CeldaServer.updateCelda(id, celda)
        .then(() => {
          console.log('Celda updated successfully');
          navigate('/celdas');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      CeldaServer.createCelda(celda)
        .then(() => {
          console.log('Celda created successfully');
          navigate('/celdas');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar celda</h2>;
    } else {
      return <h2 className='text-center'>Agregar celda</h2>;
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
              <label>Ocupada: </label>
              <input type="text" value={ocupada} onChange={(e) => setOcupada(e.target.value)} /><br />
              <button className='btn btn-success' onClick={(e) => saveCelda(e)}>Crear Celda</button>
              &nbsp;&nbsp;
              <Link to='/celdas' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { CeldaList, CrearCelda };
