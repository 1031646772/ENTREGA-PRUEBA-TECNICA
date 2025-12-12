const ListaCriptoM = ({ cryptosExternas = [], seleccionarYRegistrar }) => {
  const formatoUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

 return (
  <div className="lista-cripto-container">
    {cryptosExternas.map((cripto, index) => {
      const price = cripto?.quote?.USD?.price ?? null;
      const volume24 = cripto?.quote?.USD?.volume_24h ?? null;
      const change1h = cripto?.quote?.USD?.percent_change_1h ?? null;
      const change24h = cripto?.quote?.USD?.percent_change_24h ?? null;
      const supply = cripto?.circulating_supply ?? null;

      const marketCap =
        price && supply ? formatoUSD.format(price * supply) : "N/A";

      return (
        <div className="crypto-card" key={index}>
          <h2 className="crypto-title">{cripto.name} ({cripto.symbol.toUpperCase()})</h2>
          <p className="crypto-slug">Slug: {cripto.slug}</p>

          <div className="crypto-grid">
            <div>
              <strong>Precio USD:</strong>{" "}
              {price ? formatoUSD.format(price) : "N/A"}
            </div>

            <div>
              <strong>Cambio 1h:</strong> {change1h ?? "N/A"}%
            </div>

            <div>
              <strong>Cambio 24h:</strong> {change24h ?? "N/A"}%
            </div>

            <div>
              <strong>Volumen 24h:</strong>{" "}
              {volume24 ? formatoUSD.format(volume24) : "N/A"}
            </div>

            <div>
              <strong>Capitalización:</strong> {marketCap}
            </div>
          </div>

          <button
            className="btn-registrar"
            onClick={() => seleccionarYRegistrar(cripto)}
          >
            Registrar
          </button>
        </div>
      );
    })}
  </div>
);
};

export default ListaCriptoM;