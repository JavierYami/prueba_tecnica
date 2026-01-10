import { Router } from "express";
import { createPatient } from "../controllers/patient.controller.js";

export const patientsRouter = Router();

patientsRouter.post('/', createPatient);

