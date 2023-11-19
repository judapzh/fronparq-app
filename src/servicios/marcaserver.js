import axios from 'axios';

const API_URL = 'http://localhost:8080/api/marca';

class MarcaServer {
  getAllMarcas() {
    return axios.get(API_URL);
  }

  createMarca(marca) {
    return axios.post(API_URL, marca);
  }

  getMarcaById(marcaId) {
    return axios.get(`${API_URL}/${marcaId}`);
  }

  updateMarca(marcaId, marca) {
    return axios.put(`${API_URL}/${marcaId}`, marca);
  }

  deleteMarca(marcaId) {
    return axios.delete(`${API_URL}/${marcaId}`);
  }
}

export default new MarcaServer();
