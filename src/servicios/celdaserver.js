import axios from 'axios';

const API_URL = 'http://localhost:8080/api/celda';

class CeldaServer {
  getAllCeldas() {
    return axios.get(API_URL);
  }

  createCelda(celda) {
    return axios.post(API_URL, celda);
  }

  getCeldaById(celdaId) {
    return axios.get(`${API_URL}/${celdaId}`);
  }

  updateCelda(celdaId, celda) {
    return axios.put(`${API_URL}/${celdaId}`, celda);
  }

  deleteDelda(celdaId) {
    return axios.delete(`${API_URL}/${celdaId}`);
  }
}

export default new CeldaServer();
