
# Prueba Técnica - Frontend con Reconocimiento de Voz y Encriptación RSA

Este proyecto es una prueba técnica que combina **Angular** en el frontend con **NodeJS** en el backend. Permite al usuario dictar su nombre mediante el micrófono, ver el texto en tiempo real en un input, y luego encriptarlo usando **RSA/ECB/PKCS1Padding**.

---

## 🔹 Funcionalidades

1. Input de texto **solo lectura** que se llena en tiempo real mientras el usuario habla.
2. Filtrado de caracteres para permitir únicamente **alfanuméricos**.
3. Límite máximo de **15 caracteres** en el nombre.
4. Reconocimiento de voz utilizando la **Web Speech API**.
5. Servicio backend en NodeJS que encripta el texto con **RSA/ECB/PKCS1Padding**.
6. Opcional: desencriptación para validar el resultado. (comentado en el html)
7. Indicador visual de estado: escuchando, detenido o error. (comentado en el html).
8. CORS, RxJS para actualizaciones en tiempo real.
9. Comunicación:** HTTP (`HttpClient` de Angular)  


---

## 🔹 Tecnologías

- **Frontend:** Angular v20.2.0
- **Backend:** NodeJS v22.17.0 con Express  
- **Encriptación:** Crypto (NodeJS) con RSA PKCS1Padding  
- **Reconocimiento de voz:** Web Speech API (Chrome recomendado)  

---

## 🔹 Instalación

### Backend

1. Clonar el proyecto ``` https://github.com/juanmedina117/pruebaTecnica-salinas.git ```
2. Acceder a las carpetas frontend y backend
3. Dentro de backend en consola escribir ```node index.js``` y dar enter.
4. Dentro de frontend en consola escribir ``` ng serve -o ``` y dar enter.



