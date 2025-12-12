import axios from "axios";
import pool from "../config/BaseData.js"; // aquí ya tienes el pool de MySQL

const mockCryptos =[
  {
  "id": 1,
  "name": "Bitcoin",
  "symbol": "BTC",
  "slug": "bitcoin",
  "num_market_pairs": 12494,
  "date_added": "2013-04-28T00:00:00.000Z",
  "tags": ["mineable", "pow", "store-of-value"],
  "max_supply": 21000000,
  "circulating_supply": 19653456,
  "total_supply": 19653456,
  "infinite_supply": false,
  "platform": null,
  "cmc_rank": 1,
  "self_reported_circulating_supply": null,
  "self_reported_market_cap": null,
  "tvl_ratio": null,
  "last_updated": "2025-01-28T12:00:00.000Z",
  "quote": {
    "USD": {
      "price": 98765.43,
      "volume_24h": 28900000000,
      "volume_change_24h": 4.21,
      "percent_change_1h": -0.14,
      "percent_change_24h": 2.17,
      "percent_change_7d": 5.83,
      "market_cap": 1943000000000,
      "market_cap_dominance": 54.2,
      "fully_diluted_market_cap": 2070000000000,
      "last_updated": "2025-01-28T12:00:00.000Z"
    }
  }
},

{
  "id": 1027,
  "name": "Ethereum",
  "symbol": "ETH",
  "slug": "ethereum",
  "num_market_pairs": 7845,
  "date_added": "2015-08-07T00:00:00.000Z",
  "tags": ["smart-contracts", "ethereum-ecosystem"],
  "max_supply": null,
  "circulating_supply": 120483912,
  "total_supply": 120483912,
  "platform": null,
  "cmc_rank": 2,
  "last_updated": "2025-01-28T12:00:00.000Z",
  "quote": {
    "USD": {
      "price": 3456.78,
      "volume_24h": 18000000000,
      "percent_change_24h": 1.52,
      "market_cap": 420000000000,
      "fully_diluted_market_cap": 420000000000,
      "last_updated": "2025-01-28T12:00:00.000Z"
    }
  }
},
{
  "id": 825,
  "name": "Tether USDt",
  "symbol": "USDT",
  "slug": "tether",
  "num_market_pairs": 12023,
  "date_added": "2015-02-25T00:00:00.000Z",
  "tags": ["stablecoin"],
  "circulating_supply": 112000000000,
  "total_supply": 112000000000,
  "max_supply": null,
  "cmc_rank": 3,
  "last_updated": "2025-01-28T12:00:00.000Z",
  "quote": {
    "USD": {
      "price": 1.00,
      "volume_24h": 45000000000,
      "percent_change_24h": 0.01,
      "market_cap": 112000000000,
      "fully_diluted_market_cap": 112000000000
    }
  }
},
{
  "id": 52,
  "name": "XRP",
  "symbol": "XRP",
  "slug": "xrp",
  "num_market_pairs": 920,
  "circulating_supply": 54800000000,
  "total_supply": 99989333136,
  "cmc_rank": 4,
  "last_updated": "2025-01-28T12:00:00.000Z",
  "quote": {
    "USD": {
      "price": 0.6432,
      "percent_change_24h": -0.51,
      "market_cap": 35200000000,
      "fully_diluted_market_cap": 64300000000
    }
  }
},
{
  "id": 1839,
  "name": "BNB",
  "symbol": "BNB",
  "slug": "bnb",
  "num_market_pairs": 1160,
  "circulating_supply": 147500000,
  "total_supply": 147500000,
  "cmc_rank": 5,
  "last_updated": "2025-01-28T12:00:00.000Z",
  "quote": {
    "USD": {
      "price": 612.84,
      "percent_change_24h": 1.92,
      "market_cap": 90000000000,
      "fully_diluted_market_cap": 90200000000
    }
  }
}

]


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
 
export async function TraerCriptos1(req, res) {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: { start: 1, limit: 10, convert: "USD" },
        headers: {
          "X-CMC_PRO_API_KEY": "42396ff002c945248971906495704adf",
          "Accept": "application/json"
        }
      }
    );
    console.log(response.data)
    res.json(response.data.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
}

 
// Trae criptos mockeadas
export async function TraerCriptos(req, res) {
  console.log(mockCryptos)
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