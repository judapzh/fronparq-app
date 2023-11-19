import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PagoServer from '../servicios/pagoserver';

const PagoList = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    listarPago();
  }, []);

  const listarPago = () => {
    PagoServer.getAllPagos()
      .then(response => {
        setPagos(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deletePago = (pagoId) => {
    PagoServer.deletePago(pagoId)
      .then(() => {
        listarPago();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Lista de Pagos</h2>
      <Link to='crearPago' className='btn btn-primary mb-2'>
        Agregar un pago
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Cobro Total</th>
            <th>Fk Estancia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>{pago.cobro_total}</td>
              <td>{pago.fk_estancia}</td>
              <td>
                <Link className='btn btn-info' to={`/editar-pago/${pago.id}`}>
                  Actualizar
                </Link>
                <button
                  style={{ marginLeft: '10px' }}
                  className='btn btn-danger'
                  onClick={() => deletePago(pago.id)}
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

const CrearPago = () => {
  const [cobroTotal, setCobroTotal] = useState('');
  const [fkEstancia, setFkEstancia] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      
      PagoServer.getPagoById(id)
        .then(response => {
          const data = response.data;
          setCobroTotal(data.cobro_total);
          setFkEstancia(data.fk_estancia);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  const savePago = (e) => {
    e.preventDefault();
    const pago = { cobro_total: cobroTotal, fk_estancia: fkEstancia };

    if (id) {
      PagoServer.updatePago(id, pago)
        .then(() => {
          console.log('Pago updated successfully');
          navigate('/pagos');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      PagoServer.createPago(pago)
        .then(() => {
          console.log('Pago created successfully');
          navigate('/pagos');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Actualizar pago</h2>;
    } else {
      return <h2 className='text-center'>Agregar pago</h2>;
    }
  };

  return (
    <div className='container'>
      <div className='card col-md-6 offset-md-3 offset-md-3'>
        {title()}
        <div className='card-body'>
          <form>
            <div className='form-group-md-2'>
              <label>Cobro Total: </label>
              <input type="text" value={cobroTotal} onChange={(e) => setCobroTotal(e.target.value)} /><br />
              <label> Estancia: </label>
              <input type="text" value={fkEstancia} onChange={(e) => setFkEstancia(e.target.value)} /><br />
              <button className='btn btn-success' onClick={(e) => savePago(e)}>Crear Pago</button>
              &nbsp;&nbsp;
              <Link to='/pagos' className='btn btn-danger'>Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { PagoList, CrearPago };
