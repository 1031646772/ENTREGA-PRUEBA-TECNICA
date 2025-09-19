import { useState, useEffect } from 'react';
import { listarCriptos } from '../services/Cripto.Service.js';

export default function useListarCryptos(isAuth) {
  const [cryptos, setCryptos] = useState([]);

  const cargarCryptos = async () => {
    try {
      const response = await listarCriptos();
      console.log(response);
      setCryptos(response.data);
    } catch (err) {
      console.error("Error al listar criptomonedas:", err);
    }
  };

  useEffect(() => {
    if (isAuth) {
      cargarCryptos();
    }
  }, [isAuth]);

  return {
    cryptos,
    cargarCryptos
  };
}
