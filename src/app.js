import express, {json} from 'express';
import dotenv from 'dotenv';
import { sequelize } from "./config/db.js";
import { Doctor } from "./models/Doctor.js";
import { Patient } from "./models/Patient.js";
import { Appointment } from "./models/Appointment.js";
import { applyAssociations } from "./models/associations.js";
import { patientsRouter } from './routers/patient.router.js';
import { doctorRouter } from './routers/doctor.router.js';
import { appointmentRouter } from './routers/appointment.router.js';

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(json());

app.use('/patients', patientsRouter);

app.use('/doctors', doctorRouter);

app.use('/appointments', appointmentRouter);

try {
  await sequelize.authenticate();
  console.log("DB conectada");
  applyAssociations();
  await sequelize.sync({force: true});
  console.log("Modelos sincronizados"); 
} catch (err) {
  console.error("Error conectando a la DB:", err.message);
  process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
