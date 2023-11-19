import axios from 'axios';

const API_URL = 'http://localhost:8080/api/estancia';

class EstanciaServer {
  getAllEstancias() {
    return axios.get(API_URL);
  }

  createEstancia(estancia) {
    return axios.post(API_URL, estancia);
  }

  getEstanciaById(estanciaId) {
    return axios.get(`${API_URL}/${estanciaId}`);
  }

  updateEstancia(estanciaId, estancia) {
    return axios.put(`${API_URL}/${estanciaId}`, estancia);
  }

  deleteEstancia(estanciaId) {
    return axios.delete(`${API_URL}/${estanciaId}`);
  }
}

export default new EstanciaServer();
