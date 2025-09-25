const LoginForm = ({ Uslogin, setuslogin, Password, setPassword, onlogin }) => {
    return (
            <form onSubmit={(e) => { e.preventDefault(); onlogin(); }} className="login-form">
                <h2>Login</h2>
                <div>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={Uslogin}
                        onChange={(e) => setuslogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
    )
}

export default LoginForm