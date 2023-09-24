"use client"

// Importa React y useState
import React, { useState } from 'react';
import styles from './page.module.css';
import './global.css';

export default function Home() {
  // Inicializa el estado para el valor del campo de entrada y el valor enviado
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo seleccionado

  // Maneja los cambios en el campo de entrada
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Maneja el cambio de archivo seleccionado
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtén el primer archivo seleccionado
    setSelectedFile(file);
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedValue(inputValue);
    // Puedes trabajar con 'selectedFile' aquí para cargar el archivo si es necesario.
  };

  return (
    // Utiliza las clases de estilo definidas en 'page.module.css'
    <div className={styles.container}>
      <h1 className={styles.title}>Sustainability Level Analyzer Software</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Input para seleccionar un archivo */}
        <label className={styles.label}>
          Seleccione un archivo:
          <input
            type="file"
            accept=".csv" // Puedes especificar los tipos de archivo permitidos
            onChange={handleFileChange}
          />
        </label>
        <label className={styles.label}>
          Escriba una instrucción:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>
      {submittedValue && (
        <div className={styles.result}>
          <h2>Instrucción:</h2>
          <p>{submittedValue}</p>
        </div>
      )}
    </div>
  );
}
