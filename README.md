# Prueba técnica - Citas médicas API

API REST para el agendamiento de citas médicas entre doctores y pacientes, con validación de disponibilidad, manejo de cancelaciones de citas y filtros al obtener las citas activas.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize
- MySQL 8.0


## Instalación

1.- Clonar el repositorio

2.- Instalar dependencias con npm o el gestor de paquetes de tu preferencia

    Ejemplo: npm install

3.- Crear un archivo .env basado en .env.example

4.- Asegúrate de tener MySQL corriendo y una base de datos creada con el nombre asignado en tu archivo .env

***La base de datos debe existir previamente***

5.- Ejecutar el proyecto con el comando **npm start**

## Variables de entorno

```env

PORT=3000 ## puerto dónde escucha el servidor local.
DB_DIALECT=mysql ## el gestor de base de datos.
DB_HOST=localhost ## el host de la base de datos.
DB_PORT=3306 ## puerto de la base de datos.
DB_NAME=appointments_db ## nombre de la base de datos a crear en MySQL.
DB_USER=root ## tu nombre de ususario de MySQL.
DB_PASSWORD=contraseña_base_de_datos_ejemplo ## tu contraseña de tu usuario de MySQL.

```


## Endpoints

POST /doctors:

NOTAS: 
 - *El endpoint espera que el correo tenga un formato válido, de lo contrario mandará un error*.

Ejemplo de body: 

```JSON
{
  "firstName": "Gregory",
  "lastName": "House",
  "email": "greg.house@example.com",
  "phone": "521234567890"
}
```

POST /patients:

NOTAS: 
 - *El endpoint espera que el correo tenga un formato válido, de lo contrario mandará un error*.

Ejemplo de body: 

```JSON

{
  "firstName": "Walter",
  "lastName": "White",
  "email": "heisenberg@example.com",
  "phone": "523085858582"
}
```


POST /appointments:

- NOTAS
    - El endpoint espera que el doctor y el usuario existan, además no debe de encimarse con otra cita del mismo doctor, de lo contrario mandará un error.
    - El endpoint espera que la fecha de la cita (startTime) debe estar en formato ISO 8601, de lo contrario mandará error.
    - El endpoint calcula automáticamente la fecha final de la cita.
    - Las fechas se almacenan y se retornan en UTC.

```JSON

{
  "doctorId": 1,
  "patientId": 1,
  "startTime": "2026-01-11T13:00:00Z"
}
```


DELETE /appointments/:id : 

- NOTAS:  
    - *El endpoint espera que la cita exista, de lo contrario mandará error*.
    - *No se eliminan directamente de la base de datos, solo cambia el estado a CANCELLED*.

ejemplo de consulta: http://localhost:3000/appointments/1


GET /appointments:

- NOTAS:  
    - *El endpoint puede recibir hasta 3 parámetros opcionales para filtrar los resultados:*.
        - doctorId: id del doctor por el que deseas filtrar.
        - from: fecha del rango inicial a filtrar.
        - to: fecha del rango final a filtrar.
    - *El endpoint espera que from y to estén en formato ISO 8601, de lo contrario mandará error*.
    - *Solo se obtienen las citas que **NO** están canceladas*.
    - *Las fechas se almacenan y se retornan en UTC*.
    - *El rango devuelve citas que **intersectan** con el periodo indicado*.


Ejemplo de consulta: http://localhost:3000/appointments?doctorId=1&from=2026-01-11T12:30:00Z&to=2026-01-11T13:59:00Z


*Muchas gracias por considerarme en la postulación* 😁

