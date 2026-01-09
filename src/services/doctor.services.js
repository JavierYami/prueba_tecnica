import { Doctor } from "../models/Doctor.js";

class DoctorServices {

    async create( doctor ) {
        return await Doctor.create(doctor);
    }

    async verifyEmail( email ) {
        const doctor = await Doctor.findOne({ where: { email } });
        return doctor !== null;
    }
}

export  default new DoctorServices();
