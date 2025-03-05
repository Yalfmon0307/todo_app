import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [access, setAccess] = useState(false);

  const onSubmit = (data) => {
    
    const response = fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setAccess(true);
    })


  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Este campo es obligatorio' })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Este campo es obligatorio' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Correo Electronico</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Este campo es obligatorio' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">Registrarse</button>
        {access && <p>Acceso concedido</p>}
        {access && <Link to="/login">Iniciar Sesión</Link>}
      </form>
    </div>
  );
};
