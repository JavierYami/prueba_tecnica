import { Appointment } from "../models/Appointment.js";
import { Op } from "sequelize";


class AppointmentServices {

    async create( appointment ) {
        return await Appointment.create(appointment);
    }
    async findAll() {
        return await Appointment.findAll({
            where: { status: 'ACTIVE' }
        });
    }
    async cancel( appointmentId ) {
        const appointment = await Appointment.findByPk( appointmentId );
        if ( appointment ) {
            appointment.status = 'CANCELLED';
            await appointment.save();
            return appointment;
        }  
        throw new Error('No se encontró la cita');
    }

    async getEndTime( startTime ) {
        const start = new Date( startTime );
        return new Date( start.getTime() + 30 * 60000 );
    }

    async checkAvailability( doctorId, startTime ) {

        const endTime = await this.getEndTime( startTime );
        
        const conflictingAppointments = await Appointment.findAll({
            where: {
                doctorId: doctorId,
                status: 'ACTIVE',
                startTime: {
                    [Op.lt]: endTime
                },
                endTime: {
                    [Op.gt]: startTime
                }
            }
        });
        return conflictingAppointments.length === 0;
    }
}

export  default new AppointmentServices();