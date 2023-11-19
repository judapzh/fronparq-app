import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import tipovehiculoServer from '../servicios/tiposerver';

const MarcaList = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    listarMarca();
  }, []);

  const listarMarca = () => {
    MarcaServer.getAllMarcas()
      .then(response => {
        setMarcas(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteMarca = (marcaId) => {
    MarcaServer.deleteMarca(marcaId)
      .then(() => {
        listarMarca();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Marcas</h2>
      <Link to='crearMarca' className='btn btn-primary mb-2'>
        Agregar una marca
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
          {marcas.map((marca) => (
            <tr key={marca.id}>
              <td>{marca.id}</td>
              <td>{marca.nombre}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-marca/${marca.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deleteMarca(marca.id)}
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

const CrearMarca = () => {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the data for the given ID and populate the form fields
      MarcaServer.getMarcaById(id)
        .then(response => {
          const data = response.data;
          setNombre(data.nombre);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const saveMarca = (e) => {
    e.preventDefault();
    const marca = { nombre };

    if (id) {
      MarcaServer.updateMarca(id, marca)
        .then(() => {
          console.log('Marca updated successfully');
          navigate('/marcas');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      MarcaServer.createMarca(marca)
        .then(() => {
          console.log('Marca created successfully');
          navigate('/marcas');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar marca</h2>;
    } else {
      return <h2 className='text-center'>Agregar marca</h2>;
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
              <button className='btn btn-success' onClick={(e) => saveMarca(e)}>Crear Marca</button>
              &nbsp;&nbsp;
              <Link to='/marcas' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { MarcaList, CrearMarca };