import express, {json} from 'express';
import dotenv from 'dotenv';
import { sequelize } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(json());

try {
  await sequelize.authenticate();
  console.log("DB conectada");
  await sequelize.sync({force: true});
  console.log("Modelos sincronizados"); 
} catch (err) {
  console.error("Error conectando a la DB:", err.message);
  process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
