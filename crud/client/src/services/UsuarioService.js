import axios from 'axios';

const API_URL = "http://localhost:3300/usuarios";

// Login (esto no lleva token porque es público)
export function LogearUser(data) {
  return axios.post(`${API_URL}/Logear`, data);
}

// Registrar (esto sí lleva token en los headers)
export function registrarUsuario(data) {
  return axios.post(`${API_URL}/Registrar`, data);
}



