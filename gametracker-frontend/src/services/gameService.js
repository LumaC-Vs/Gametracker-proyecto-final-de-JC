import axios from 'axios';

const API_URL = 'http://localhost:5000/api/games';

// Obtener todos los juegos
export const getAllGames = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener un juego específico
export const getGameById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear un nuevo juego
export const createGame = async (gameData) => {
  const response = await axios.post(API_URL, gameData);
  return response.data;
};

// Actualizar un juego
export const updateGame = async (id, gameData) => {
  const response = await axios.put(`${API_URL}/${id}`, gameData);
  return response.data;
};

// Eliminar un juego
export const deleteGame = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Obtener reseñas de un juego
export const getGameResenas = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/resenas`);
  return response.data;
};