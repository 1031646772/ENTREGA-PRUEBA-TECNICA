import axios from "axios";
import poolPromise from '../config/BaseData.js'
import sql from 'mssql/msnodesqlv8.js';

const mockCryptos = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    current_price: 30000,
    market_cap: 600000000000,
    price_change_percentage_24h: 1.2,
    total_volume: 35000000000,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    current_price: 2000,
    market_cap: 250000000000,
    price_change_percentage_24h: -0.5,
    total_volume: 18000000000,
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    current_price: 0.5,
    market_cap: 25000000000,
    price_change_percentage_24h: 0.8,
    total_volume: 5000000000,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    current_price: 0.35,
    market_cap: 12000000000,
    price_change_percentage_24h: -1.1,
    total_volume: 1200000000,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    current_price: 35,
    market_cap: 12000000000,
    price_change_percentage_24h: 2.5,
    total_volume: 1500000000,
  }
];


export async function ListarCryptos(req, res) {
  try {
    const pool = await poolPromise; // obtenemos pool conectado
    const result = await pool.request()
      .query("SELECT * FROM Criptomonedas"); // consulta para obtener todas las criptos

    res.json(result.recordset); // enviamos el arreglo de criptos como JSON
  } catch (err) {
    console.error("Error al listar criptomonedas:", err);
    res.status(500).send("Error en la base de datos");
  }
}

const instance = axios.create({
  httpsAgent: new (await import("https")).Agent({ rejectUnauthorized: false })
});

export async function TraerCriptos1(req, res) {
  try {
    const response = await instance.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false
        }
      }
    );
    res.json(response.data);
    console.log(response)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function TraerCriptos(req, res) {
  try {
    res.json(mockCryptos);
    console.log(mockCryptos)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}


export async function RegistrarCripto(req, res) {
  const { CmcId, Nombre, Simbolo, Slug } = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input('CmcId', sql.NVarChar, CmcId)
      .input('Nombre', sql.NVarChar, Nombre)
      .input('Simbolo', sql.NVarChar, Simbolo)
      .input('Slug', sql.NVarChar, Slug)
      .query(`
        INSERT INTO Criptomonedas
        (CmcId, Nombre, Simbolo, Slug)
        VALUES (@CmcId, @Nombre, @Simbolo, @Slug)
      `);

    res.status(201).json({ message: "Criptomoneda registrada correctamente" });

  } catch (err) {
    console.error("Error al registrar cripto:", err);

    // Si es un error de UNIQUE (símbolo duplicado)
    if (err.number === 2627) {
      res.status(400).json({ error: "El símbolo ya existe" });
    } else {
      res.status(500).json({ error: "Error en la base de datos" });
    }
  }
}