import axios from 'axios';

const API_URL = 'http://localhost:8080/api/empleado';

// Servicio para obtener la lista de empleados
const getEmpleados = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching empleados:', error);
    throw error;
  }
};

// Servicio para crear un nuevo empleado
const createEmpleado = async (empleadoData) => {
  try {
    const response = await axios.post(API_URL, empleadoData);
    console.log('Empleado creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    throw error;
  }
};

// Servicio para borrar un empleado por ID
const deleteEmpleado = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Empleado eliminado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al borrar el empleado:', error);
    throw error;
  }
};

export { getEmpleados, createEmpleado, deleteEmpleado };
