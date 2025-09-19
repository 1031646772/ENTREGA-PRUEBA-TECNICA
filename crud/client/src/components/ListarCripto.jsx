const ListaCriptoM = ({ cryptosExternas = [], seleccionarYRegistrar }) => {
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
            <h3>Precio USD: ${cripto.current_price}</h3>
          </div>
          <div className="columnaList">
            <h3>Volumen 24h: ${cripto.total_volume.toLocaleString()}</h3>
          </div>
          <div className="columnaList">
            <h3>Capitalización: ${cripto.market_cap.toLocaleString()}</h3>
          </div>
          <div className="columnaList">
            <button
              className="boton-lis" id="RegisCripBo"
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
