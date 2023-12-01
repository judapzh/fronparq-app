import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pago';

class PagoServer {
  getAllPagos() {
    return axios.get(API_URL);
  }

  createPago(pago) {
    return axios.post(API_URL, pago);
  }

  getPagoById(pagoId) {
    return axios.get(`${API_URL}/${pagoId}`);
  }

  updatePago(pagoId, pago) {
    return axios.put(`${API_URL}/${pagoId}`, pago);
  }

  deletePago(pagoId) {
    return axios.delete(`${API_URL}/${pagoId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PagoServer();
