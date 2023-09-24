"use client"

// Importa React y useState
import React, { useState } from 'react';

// Importa los estilos CSS desde './page.module.css'
import styles from './page.module.css';

export default function Home() {
  // Inicializa el estado para el valor del campo de entrada y el valor enviado
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  // Maneja los cambios en el campo de entrada
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedValue(inputValue);
  };

  return (
    // Utiliza las clases de estilo definidas en 'page.module.css'
    <div className={styles.container}>
      <h1 className={styles.title}>Sustainability Level Analyzer Software</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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


