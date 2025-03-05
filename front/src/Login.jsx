import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [access, setAccess] = useState(false);
  


  const onSubmit = (data) => {
    const response = fetch('http://localhost:3000/login', {
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
    })
    
    setAccess(true);
    // Aquí puedes manejar la lógica de inicio de sesión, como enviar los datos a tu API
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

          {access && <p>Acceso concedido</p>}
          {access && <Link to="/tasks">ir a mis tareas</Link>}
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};
