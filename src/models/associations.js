import { Patient } from "./Patient.js";
import { Doctor } from "./Doctor.js";
import { Appointment } from "./Appointment.js";

export function applyAssociations() {
  Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
  Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

  Patient.hasMany(Appointment, { foreignKey: "patientId" });
  Appointment.belongsTo(Patient, { foreignKey: "patientId" });
}