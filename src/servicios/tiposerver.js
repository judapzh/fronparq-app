import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tvehiculo';

class TipoVehiculoServer {
  getAllTiposVehiculo() {
    return axios.get(API_URL);
  }

  createTipoVehiculo(tipoVehiculo) {
    return axios.post(API_URL, tipoVehiculo);
  }

  getTipoVehiculoById(tipoVehiculoId) {
    return axios.get(`${API_URL}/${tipoVehiculoId}`);
  }

  updateTipoVehiculo(tipoVehiculoId, tipoVehiculo) {
    return axios.put(`${API_URL}/${tipoVehiculoId}`, tipoVehiculo);
  }

  deleteTipoVehiculo(tipoVehiculoId) {
    return axios.delete(`${API_URL}/${tipoVehiculoId}`);
  }
}

export default new TipoVehiculoServer();
