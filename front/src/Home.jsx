import { Link } from "react-router-dom"

export function Home() {
  return (
    <>
      <h1>Bienvenido a la aplicacion TodoApp</h1>
      <p>Puedes iniciar sesion o registrarte</p>
      <Link to="/login" className="link">Iniciar Sesión</Link>
      <Link to="/register" className="link">Registrarme</Link>
    </>
  ) 
}