import { useState } from "react";
import './css/login.css';
import './css/App.css';
import './css/Cripto.css';
import './css/RegistrarUsu.css';

import LoginForm from './components/Login.jsx';
import FormUsuario from './components/RegistroUsuario.jsx'
import useLogin from './hooks/UseLoginForm.js';
import useCryptoExternoForm from './hooks/usecripto.js';
import useListarCryptos from './hooks/usecriptoListar.js';
import ListaCriptoM from './components/ListarCripto.jsx';
import useUsuario from './hooks/useUsuarioForm.js'

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const {
    Uslogin,
    setuslogin,
    Password,
    setPassword,
    LogeoUser
  } = useLogin();

  const {
    Nombre,
    setNombre,
    Email,
    setEmail,
    Passwordd,
    setPasswordd,
    RegisEmplea
  } = useUsuario();


  // Hook de criptos externas
  const {
    cryptosExternas,
    seleccionarYRegistrar
  } = useCryptoExternoForm(isAuth);

  // Hook de criptos registradas en BD
  const {
    cryptos,
    cargarCryptos
  } = useListarCryptos(isAuth);

  return (
    <div  className="container-index">
      {!isAuth ? (
        <div className="second-container"> 
        <LoginForm
          Uslogin={Uslogin}
          setuslogin={setuslogin}
          Password={Password}
          setPassword={setPassword}
          onlogin={async () => {
            const ok = await LogeoUser(); 
            if (ok) {
              setIsAuth(true); 
              cargarCryptos(); 
            } else {
              setIsAuth(false);  
            }
          }}
        />
        
        <FormUsuario 
          Nombre={Nombre}
          setNombre={setNombre}
          Passwordd={Passwordd}
          setPasswordd={setPasswordd}
          Email={Email}
          setEmail={setEmail} RegisEmplea={RegisEmplea}
        />
        </div>
      ) : (
        <div className="App">
          <div className="Datos">
            <h2 className="titulo">Criptomonedas Externas a seguir</h2>
            {cryptosExternas.length === 0 ? (
              <p id="cargando">Cargando criptos...</p>
            ) : (
              <ListaCriptoM 
                cryptosExternas={cryptosExternas} 
                seleccionarYRegistrar={async (cripto) => {
                  await seleccionarYRegistrar(cripto); 
                  await cargarCryptos();
                }}
              />
            )}
          </div>

          <div className="contenedor">
            <div className="titulo">
              <h1> Criptomonedas Registradas</h1>
            </div>

            <div className="crypto-container">
              <h1 className="crypto-title">Mis Criptomonedas</h1>

              <div className="crypto-grid">
                {cryptos.length === 0 ? (
                  <p className="empty">No hay criptos registradas aún </p>
                ) : (
                  cryptos.map((c) => (
                    <div className="crypto-card" key={c.Id}>
                      <div className="crypto-header">
                        <h2 className="crypto-name">{c.Nombre}</h2>
                        <span className="crypto-symbol">{c.Simbolo}</span>
                      </div>
                      <div className="crypto-body">
                        <p className="crypto-slug">Slug: {c.Slug}</p>
                        <p className="crypto-id">CMC ID: {c.CmcId}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
