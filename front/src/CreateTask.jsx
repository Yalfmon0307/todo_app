import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CreateTask = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    setExito(null);

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Esto incluye cookies en la solicitud
        body: JSON.stringify({ task }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      } else {
        setExito(data.message);
        setTask(''); // Limpiar el campo de entrada
      }
    } catch (err) {
      setError('Error al crear la tarea');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <h1>Crear Tarea</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Ingresa la tarea"
          required
        />
        <button type="submit" disabled={cargando}>
          {cargando ? 'Creando...' : 'Crear Tarea'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {exito && <p style={{ color: 'green' }}>{exito}</p>}
      <Link to="/tasks">Volver a mis tareas</Link>
    </div>
  );
};

