import appointmentServices from "../services/appointment.services.js";

export const createAppointment = async ( req, res ) => {
    const appointment = req.body;

    try {
        
        if ( !appointment || !appointment.startTime || !appointment.doctorId || !appointment.patientId ) return res.status(400).json({ error: "Faltan campos requeridos" });

        const start = new Date( appointment.startTime );

        if (isNaN(start.getTime())) return res.status(400).json({ error: "La fecha y hora de inicio no es válida" });

        if ( start <= new Date() ) return res.status(400).json({ error: "La fecha y hora de inicio no puede ser en el pasado" });

        appointment.endTime = await appointmentServices.getEndTime( start );

        const isAvailable = await appointmentServices.checkAvailability(appointment.doctorId, start );

        if ( !isAvailable ) return res.status(409).json({ error: "El doctor no está disponible en el horario solicitado" });
    
        const newAppointment = await appointmentServices.create( appointment, appointment.doctorId, appointment.patientId );
        return res.status(201).json({ newAppointment });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
}

export const getAllAppointments = async ( req, res ) => {
    const { doctorId, from, to} = req.query;

    try {

        const fromDate = from ? new Date(from) : null;

        const toDate = to ? new Date(to) : null;
        
        if ( from && isNaN( fromDate.getTime() ) ) return res.status(400).json({ error: "la fecha inicial del rango no es valida" });

        if ( to && isNaN( toDate.getTime() ) ) return res.status(400).json({ error: "la fecha final del rango no es valida" });

        if ( fromDate && toDate && fromDate > toDate ) return res.status(400).json({ error: "la fecha inicial del rango no puede ser mayor que la fecha final" });

        const appointments = await appointmentServices.findAll( doctorId, fromDate, toDate );
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

        if ( !cancelledAppointment ) return res.status(404).json({ error: "Cita no encontrada" });
        
        return res.status(200).json({ cancelledAppointment });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }  
}