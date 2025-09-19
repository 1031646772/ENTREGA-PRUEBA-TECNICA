import axios from 'axios';

const API_URL = "http://localhost:3300/cripto";

// Traer token del localStorage
const getToken = () => localStorage.getItem("token");

// Registrar cripto
export function registrarCriptp(data) {
  const token = getToken();
  return axios.post(`${API_URL}/Registrar`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Actualizar cripto
export function actualizarCriptp(id, data) {
  const token = getToken();
  return axios.put(`${API_URL}/Actualizar/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Eliminar cripto
export function eliminarCriptp(id) {
  const token = getToken();
  return axios.delete(`${API_URL}/Eliminar/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Listar todas las criptos
export function listarCriptos() {
  const token = getToken();
  return axios.get(`${API_URL}/consultar`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function traerCriptos() {
  const token = getToken();
  return axios.get(`${API_URL}/externas`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

