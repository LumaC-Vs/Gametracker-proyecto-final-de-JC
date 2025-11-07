import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resenas';

// Obtener todas las reseñas
export const getAllResenas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crear una nueva reseña
export const createResena = async (resenaData) => {
  const response = await axios.post(API_URL, resenaData);
  return response.data;
};

// Actualizar una reseña
export const updateResena = async (id, resenaData) => {
  const response = await axios.put(`${API_URL}/${id}`, resenaData);
  return response.data;
};

// Eliminar una reseña
export const deleteResena = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};