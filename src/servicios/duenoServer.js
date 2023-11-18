import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dueno';

class DuenoServer {
  getAllDuenos() {
    return axios.get(API_URL);
  }

  createDueno(dueno) {
    return axios.post(API_URL, dueno);
  }

  getDuenoById(duenoId) {
    return axios.get(`${API_URL}/${duenoId}`);
  }

  updateDueno(duenoId, dueno) {
    return axios.put(`${API_URL}/${duenoId}`, dueno);
  }

  deleteDueno(duenoId) {
    return axios.delete(`${API_URL}/${duenoId}`);
  }
}

export default new DuenoServer();
