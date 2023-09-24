## TECH TEAM 🤖
## SLAS, Sustainability Level Analyzer Software 🍃
Mesa 13-H
Proyecto para Softtek

## Descripción general 📖
Software dirigido a empresas para obtener un análisis de su nivel de sostenibilidad mediante estadística y gráficas, teniendo como datos de entrada bases de datos, documentos pdf, prompts, tablas, etc. Con el objetivo de conocer si son aptas para obtener un certificado ISO y LEED, y dar recomendaciones para reducir su impacto ambiental dependiendo de la industria a la que pertenezcan.

## Instalar paquetes necesarios 🙂

``` 
pip install matplotlib
pip install git+https://github.com/Fridaplatform/SofttekLLMSDK.git
```
## BACKEND 🐍
Archivo de python "leerCSV.py": leectura del archivo CSV, cuenta con la generación de prompts, query a OpenAI, imprimir las respuestas generadas por Chat GPT-3.5, y generación de gráficas con matplotlib.

## FRONTEND 💻
Proyecto de Next.js: en url de navegador ingresar "http://localhost:3000/pages/prompt", cuenta con una página que contiene un espacio para subir un archivo .csv para simular ser analizado por Chat GPT-3.5 y posteriormente desplegar el análisis con números y gráficas. También una caja de texto donde se puede introducir un mensaje para hacer preguntas a la inteligencia artificial, se simula una respuesta a una pregunta que da recomendaciones y se despliega la información.
