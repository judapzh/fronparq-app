import axios from 'axios';

const API_URL = 'http://localhost:8080/api/vehiculo';

class VehiculoServer {
  getAllVehiculos() {
    return axios.get(API_URL);
  }

  createVehiculo(vehiculo) {
    return axios.post(API_URL, vehiculo);
  }

  getVehiculoById(vehiculoId) {
    return axios.get(`${API_URL}/${vehiculoId}`);
  }

  updateVehiculo(vehiculoId, vehiculo) {
    return axios.put(`${API_URL}/${vehiculoId}`, vehiculo);
  }

  deleteVehiculo(vehiculoId) {
    return axios.delete(`${API_URL}/${vehiculoId}`);
  }
}

export default new VehiculoServer();
