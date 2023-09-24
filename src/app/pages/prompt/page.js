/* page.js */
"use client"

// Importa React y useState
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import './global.css';
import Image from 'next/image';

export default function Home() {
  // Inicializa el estado para el valor del campo de entrada y el valor enviado
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo seleccionado
  const [showDropdown, setShowDropdown] = useState(false); // Estado para controlar si se muestra el cuadro desplegable
  const [fileUploaded, setFileUploaded] = useState(false); // Estado para controlar si se cargó un archivo


  // Maneja los cambios en el campo de entrada
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Maneja el cambio de archivo seleccionado
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtén el primer archivo seleccionado
    setSelectedFile(file);
    setFileUploaded(true); // Indica que se cargó un archivo
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedValue(inputValue);
  }

  // Esta función se ejecuta cuando fileUploaded cambia a true
  useEffect(() => {
    if (fileUploaded) {
      setShowDropdown(true); // Muestra automáticamente el cuadro desplegable
    }
  }, [fileUploaded]);

  return (
    // Utiliza las clases de estilo definidas en 'page.module.css'
    <div className={styles.container}>
      <h1 className={styles.title}>Sustainability Level Analyzer Software</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Input para seleccionar un archivo */}
        <label className={styles.label}>
          Seleccione un archivo CSV:
          <input
            type="file"
            accept=".csv" // Limita la selección a archivos CSV
            onChange={handleFileChange}
          />
        </label>

        {/* Muestra un cuadro de mensaje si se cargó un archivo */}
        {fileUploaded && (
          <div
            className={`${styles.message} ${styles.successMessage}`}
          >
            Archivo CSV cargado con éxito.
          </div>
        )}

        {/* Cuadro desplegable */}
        {showDropdown && (
          <div className={`${styles.dropdown} ${styles.showDropdown}`}>
            {/* Contenido del cuadro desplegable */}
            <div className={styles.columnData}>
              <div className={styles.columnTitle}>Column: 'lead'</div>
              <div className={styles.columnValues}>
                - Min: 0.09<br />
                - Max: 0.17<br />
                - Mean: 0.135<br />
                - Range: 0.08
              </div>
            </div>
            
            {/* Repite el mismo formato para las otras columnas */}
            <div className={styles.columnData}>
              <div className={styles.columnTitle}>Column: ' nitrogen oxides'</div>
              <div className={styles.columnValues}>
                - Min: 0<br />
                - Max: 140.74<br />
                - Mean: 67.495<br />
                - Range: 140.74
              </div>
            </div>
            
            <div className={styles.columnData}>
              <div className={styles.columnTitle}>Column: ' total hydrocarbons'</div>
              <div className={styles.columnValues}>
                - Min: 0<br />
                - Max: 29.87<br />
                - Mean: 9.27<br />
                - Range: 29.87
              </div>
            </div>
            
            <div className={styles.columnData}>
              <div className={styles.columnTitle}>Column: ' dioxins and furans'</div>
              <div className={styles.columnValues}>
                - Min: 0<br />
                - Max: 0.37<br />
                - Mean: 0.0925<br />
                - Range: 0.37
              </div>
            </div>
            
            <div className={styles.columnData}>
              <div className={styles.columnTitle}>Based on this information, we can make some general observations about the dataset:</div>
              <div className={styles.columnValues}>
              <br />- The lead emissions range from 0.09 to 0.17, with an average of 0.115. These values are below the maximum permissible limit of 0.2, as stipulated by the regulation NOM-098-SEMARNAT-2002.<br />
              <br />- The nitrogen oxides emissions range from 0 to 140.74, with an average of 82.096. The maximum value exceeds the permissible limit of 150.00 set by the regulation.<br />
              <br />- The total hydrocarbons emissions range from 0 to 29.87, with an average of 17.9625. The maximum value is below the permissible limit of 70.00.<br />
              <br />- The dioxins and furans levels range from 0 to 0.37, with an average of 0.0925. These values are also below the maximum limit of 0.2 mg/m³.
              </div>
            </div>

            <div className={styles.columnData}>
            <div className={styles.columnTitle}>Análisis general en gráficos</div>
            <div className={styles.columnValues}>
              {/* Aquí comienza la tabla */}
              <table className={styles.centerTable}>
                <thead>
                  <tr>
                    <th>Variables</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {/* Utiliza el componente Image en lugar de <img> */}
                      <Image src="/Figure_1.png" alt="Gráfico 1" width={300} height={200} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Image src="/Figure_2.png" alt="Gráfico 2" width={300} height={200} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Image src="/Figure_3.png" alt="Gráfico 3" width={300} height={200} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Image src="/Figure_4.png" alt="Gráfico 4" width={300} height={200} />
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Aquí termina la tabla */}
            </div>
          </div>
          </div>
          )}

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
          <h2>Tú</h2>
          <p>{submittedValue}</p>
        </div>
      )}
      {submittedValue && (
        <div className={styles.result}>
          <h2>GPT-3.5</h2>
          <div className={styles.columnValues}>
          Overall, it appears that the dataset complies with the regulatory limits for all measured pollutants.<br />

          <br />To reduce the emissions of lead and nitrogen oxides, here are some quick tips:<br />
          <br />1. Implement proper maintenance and calibration of emission-control equipment to ensure optimal performance and minimize the release of lead and nitrogen oxides into the atmosphere.<br />
          <br />2. Opt for cleaner and more efficient fuel sources or technologies to reduce the production of lead and nitrogen oxides during the metal processing.<br />
          <br />3. Monitor and optimize process parameters to minimize waste production and emissions.<br />
          <br />4. Train and educate employees on proper operating procedures and the importance of minimizing emissions.<br />

          <br />Remember, it is always important to follow applicable regulations and consult with environmental experts to tailor emission reduction strategies to specific industrial processes and operations.
          The regulation that stipulates the permissible limits for these emissions is NOM-098-SEMARNAT-2002, Environmental Protection - Waste incineration, specifications of operation and pollutant emission limits. This regulation sets the maximum amount of milligrams per cubic meter of micro minerals that the emitted gases can have. Specifically, it states that lead emissions should not exceed 0.2 milligrams per cubic meter, nitrogen oxides should not exceed 150.00 milligrams per cubic meter, total hydrocarbons should not exceed 70.00 milligrams per cubic meter, and dioxins with furans should not exceed 0.2 milligrams per cubic meter.<br />
          <br />Compliance with these regulations is crucial to avoid legal problems in the future and ensure environmental protection.
          </div>
        </div>
      )}
    </div>
  );
}
