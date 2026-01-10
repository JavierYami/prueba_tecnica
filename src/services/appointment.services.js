import { Appointment } from "../models/Appointment.js";
import { Doctor } from "../models/Doctor.js";
import { Patient } from "../models/Patient.js";
import { Op } from "sequelize";


class AppointmentServices {

    async create( appointment, doctorId, patientId ) {
        const doctor = await Doctor.findByPk( doctorId );
        if ( !doctor ) throw new Error('No se encontró el doctor');
        const patient = await Patient.findByPk( patientId );
        if ( !patient ) throw new Error('No se encontró el paciente');
        return await Appointment.create(appointment);
    }

    async findAll( doctorId, from, to ) {
        const where = { status: 'ACTIVE' };
        if ( doctorId ) where.doctorId = doctorId;
        if ( from && !to ) {
            where.endTime = {
                [Op.gte]: from
            };
        }
        if ( to && !from ) {
            where.startTime = {
                [Op.lte]: to
            };
        }
        if ( from && to ) {
            where.startTime = {
                [Op.lte]: to
            };
            where.endTime = {
                [Op.gte]: from
            };
        }
        return await Appointment.findAll({
            where: where
        });
    }
    
    async cancel( appointmentId ) {
        const appointment = await Appointment.findByPk( appointmentId );
        if ( appointment ) {
            appointment.status = 'CANCELLED';
            await appointment.save();
            return appointment;
        }  
        return null;
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