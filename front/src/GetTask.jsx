import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const GetTask = () => {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerTareas = async () => {
      setCargando(true);
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        credentials: 'include', // Esto incluye cookies en la solicitud
      });

      if (!response.ok) {
        const text = await response.text(); // Obtiene el texto de la respuesta
        setError(`Error: ${response.status} - ${text}`);
        setCargando(false);
        return;
      }

      const data = await response.json();
      setTareas(data.tasks || []); // Usa un arreglo vacío si `data.tareas` es undefined
      setCargando(false);
    };

    obtenerTareas();
  }, []);

  if (cargando) {
    return <div>Cargando tareas...</div>;
  }

  return (
    <div>
      <h1>Tareas</h1>
      {error ? (
        <p>{error}</p>
      ) : tareas.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id}>{tarea.task}</li> // Asumiendo que cada tarea tiene un "id" y "nombre"
          ))}
        </ul>
      )}
      <Link to="/createTask">Agregar Tarea</Link>
    </div>
  );
};

