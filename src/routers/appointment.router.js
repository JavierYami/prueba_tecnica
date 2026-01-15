import { Router } from "express";
import { getAllAppointments, createAppointment, cancelAppointment } from "../controllers/appointment.controller.js";

export const appointmentRouter = Router();


appointmentRouter.get('/', getAllAppointments);
appointmentRouter.post('/', createAppointment);
appointmentRouter.delete('/:appointmentId', cancelAppointment);


