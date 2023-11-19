import axios from 'axios';

const API_URL = 'http://localhost:8080/api/empleado';

class EmpleadoServer {
  getAllEmpleados() {
    return axios.get(API_URL);
  }

  createEmpleado(empleado) {
    return axios.post(API_URL, empleado);
  }

  getEmpleadoById(empleadoId) {
    return axios.get(`${API_URL}/${empleadoId}`);
  }

  updateEmpleado(empleadoId, empleado) {
    return axios.put(`${API_URL}/${empleadoId}`, empleado);
  }

  deleteEmpleado(empleadoId) {
    return axios.delete(`${API_URL}/${empleadoId}`);
  }
}

export default new EmpleadoServer();


