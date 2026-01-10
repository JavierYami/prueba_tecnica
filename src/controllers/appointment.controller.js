import appointmentServices from "../services/appointment.services.js";

export const createAppointment = async ( req, res ) => {
    const appointment = req.body;

    try {
        
        if ( !appointment || !appointment.startTime || !appointment.doctorId || !appointment.patientId ) return res.status(400).json({ error: "Faltan campos requeridos" });

        appointment.endTime = await appointmentServices.getEndTime( appointment.startTime );

        const isAvailable = await appointmentServices.checkAvailability(appointment.doctorId, new Date( appointment.startTime ) );

        if ( !isAvailable ) return res.status(409).json({ error: "El doctor no está disponible en el horario solicitado" });
    
        const newAppointment = await appointmentServices.create( appointment );
        return res.status(201).json({ newAppointment });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
}

export const getAllAppointments = async ( req, res ) => {
    try {
        const appointments = await appointmentServices.findAll();
        return res.status(200).json({ appointments });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const cancelAppointment = async ( req, res ) => {
    const { appointmentId } = req.params;
    try {
        if ( !appointmentId ) return res.status(400).json({ error: "El ID de la cita es requerido" });
        
        const cancelledAppointment = await appointmentServices.cancel( appointmentId );
        return res.status(200).json({ cancelledAppointment });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }  
}