import patientsServices from "../services/patient.services.js"

export const createPatient = async ( req, res ) => {

    const patient = req.body;

    try {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if ( !patient.firstName || !patient.lastName || !patient.email || !patient.phone ) return res.status(400).json({ error: "Faltan campos requeridos" });

        if ( !emailRegex.test( patient.email ) ) return res.status(400).json({ error: "Email inválido" });

        const emailExists = await patientsServices.verifyEmail( patient.email );

        if ( emailExists ) return res.status(409).json({ error: "El email ya está registrado" });

        if ( patient.phone.length < 10 || patient.phone.length > 15 ) return res.status(400).json({ error: "El número de teléfono es inválido" });

        const newPatient = await patientsServices.create( patient );

        return res.status(201).json({ newPatient });
        
    } catch (error) {
    
        return res.status(500).json({ error: error.message });
        
    }

}