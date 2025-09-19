const ListaCriptoM = ({ cryptosExternas = [], seleccionarYRegistrar }) => {
  const formatoUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return (
    <div className="Lista">
      {cryptosExternas.map((cripto, index) => (
        <div className="unidadU" key={index}>
          <div className="columnaList bordercolum">
            <h3>Nombre: {cripto.name}</h3>
          </div>
          <div className="columnaList">
            <h3>Símbolo: {cripto.symbol.toUpperCase()}</h3>
          </div>
          <div className="columnaList">
            <h3>Precio USD: {formatoUSD.format(cripto.current_price || 0)}</h3>
          </div>
          <div className="columnaList">
            <h3>Volumen 24h: {formatoUSD.format(cripto.total_volume || 0)}</h3>
          </div>
          <div className="columnaList">
            <h3>Capitalización: {formatoUSD.format(cripto.market_cap || 0)}</h3>
          </div>
          <div className="columnaList">
            <button
              className="boton-lis"
              id="RegisCripBo"
              onClick={() => seleccionarYRegistrar(cripto)}
            >
              Registrar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaCriptoM;
