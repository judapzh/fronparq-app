import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dueno';

const obtenerDuenos = () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al obtener la lista de dueños:', error);
      throw error;
    });
}

const crearDueno = (duenoData) => {
  return axios.post(API_URL, duenoData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al crear el dueño:', error);
      throw error;
    });
}

const borrarDueno = (id) => {
  return axios.delete(`${API_URL}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al borrar el dueño:', error);
      throw error;
    });
}

    
    export {
      obtenerDuenos,
      crearDueno,
      borrarDueno
    };
    

