import axios from "axios";
import pool from "../config/BaseData.js"; // aquí ya tienes el pool de MySQL
 
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

// Lista criptos desde la BD
export async function ListarCryptos(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM Criptomonedas");
    res.json(rows);
  } catch (err) {
    console.error("Error al listar criptomonedas:", err);
    res.status(500).send("Error en la base de datos");
  }
}
 
// Axios instance (opcional, sin certificados)
const instance = axios.create();
 
// Trae criptos desde CoinGecko
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
          sparkline: false,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
 
// Trae criptos mockeadas
export async function TraerCriptos(req, res) {
  res.json(mockCryptos);
}
 
// Registrar criptomoneda en MySQL
export async function RegistrarCripto(req, res) {
  const { CmcId, Nombre, Simbolo, Slug } = req.body;
 
  try {
    await pool.query(
      `INSERT INTO Criptomonedas (CmcId, Nombre, Simbolo, Slug) VALUES (?, ?, ?, ?)`,
      [CmcId, Nombre, Simbolo, Slug]
    );
 
    res.status(201).json({ message: "Criptomoneda registrada correctamente" });
  } catch (err) {
    console.error("Error al registrar cripto:", err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "El símbolo ya existe" });
    } else {
      res.status(500).json({ error: "Error en la base de datos" });
    }
  }
}