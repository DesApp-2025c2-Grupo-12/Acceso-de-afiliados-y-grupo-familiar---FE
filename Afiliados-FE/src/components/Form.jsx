import React from 'react'
import "./Form.css"

export default function Form() {
  return (
    <>
    <h1>Bienvenido</h1>,
    <h3>Iniciar sesión en el Portal Afiliado</h3>,
    <div className='form-container'>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Credencial</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              /> 
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            <div className="form-text mt-2">
              <a href="#">¿Olvidaste tu nombre de usuario o contraseña?</a>
            </div>
            <div className="form-text">¿No tienes una cuenta?</div>
            <div className="form-text">
              <a href="#">Crear una cuenta</a>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
