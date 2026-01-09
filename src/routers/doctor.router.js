import { Router } from "express";
import { createDoctor } from "../controllers/doctor.controller.js";

export const doctorRouter = Router();

doctorRouter.post('/', createDoctor);
