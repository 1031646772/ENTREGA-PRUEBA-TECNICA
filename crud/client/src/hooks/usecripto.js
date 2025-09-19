import { useState, useEffect } from 'react';
import { registrarCriptp } from '../services/Cripto.Service';
import {traerCriptos} from '../services/Cripto.Service';

export default function useCryptoExternoForm(isAuth) {
  // Estados del formulario
  const [Id, setId] = useState(0);
  const [CmcId, setCmcId] = useState(0);
  const [Nombre, setNombre] = useState("");
  const [Simbolo, setSimbolo] = useState("");
  const [Slug, setSlug] = useState("");
  const [Accion, setAccion] = useState("Agregar");

  // Estados de criptos externas
  const [cryptosExternas, setCryptosExternas] = useState([]);

  // Función para traer criptos desde back-end (que llama CoinMarketCap)
  const cargarCriptosExternas = async () => {
    try {
      //los parámetros que pide el endpoint
      // vs_currency: moneda para los precios (usd)
      // per_page: cantidad de criptos por página
      // page: número de página
      const data = await traerCriptos();
      setCryptosExternas(data.data); // Actualiza el estado con la lista de criptos
      console.log(data.data)
    } catch (err) {
      console.error("Error al traer criptos externas:", err);
    }
  };

  // Función para seleccionar y registrar una cripto
  const seleccionarYRegistrar = async (cripto) => {
    try {
      // Actualizar estados del formulario
      setCmcId(cripto.id);
      setNombre(cripto.name);
      setSimbolo(cripto.symbol);
      setSlug(cripto.slug);
      setAccion("Agregar");

      console.log(cripto.id)

      // Guardar en BD
      await registrarCriptp({ CmcId: cripto.id, Nombre: cripto.name, Simbolo: cripto.symbol, Slug: cripto.slug });
      alert(`${cripto.name} registrada en la BD`);

    } catch (err) {
      console.error("Error al registrar cripto:", err);
      alert("Error al registrar cripto");
    }
  };

  // Cargar criptos externas automáticamente al autenticar
  useEffect(() => {
    if (isAuth) {
      cargarCriptosExternas();
    }
  }, [isAuth]);

  return {
    Id, setId,
    CmcId, setCmcId,
    Nombre, setNombre,
    Simbolo, setSimbolo,
    Slug, setSlug,
    Accion, setAccion,
    cryptosExternas,
    useCryptoExternoForm,
    cargarCriptosExternas,
    seleccionarYRegistrar
  };
}
