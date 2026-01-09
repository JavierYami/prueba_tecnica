import { Patient } from "../models/Patient.js";

class PatientsServices {

    async create( patient ) {
        return await Patient.create(patient);
    }

    async verifyEmail( email ) {
        const patient = await Patient.findOne({ where: { email } });
        return patient !== null;
    }
}

export  default new PatientsServices();

