import DoctorServices from "../services/doctor.services.js"

export const createDoctor = async ( req, res ) => {

    const doctor = req.body;    
    try {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if ( !doctor.firstName || !doctor.lastName || !doctor.email || !doctor.phone ) return res.status(400).json({ error: "Faltan campos requeridos" });

        if ( !emailRegex.test( doctor.email ) ) return res.status(400).json({ error: "Email inválido" });

        const emailExists = await DoctorServices.verifyEmail( doctor.email );
        if ( emailExists ) return res.status(409).json({ error: "El email ya está registrado" });

        if ( doctor.phone.length < 10 || doctor.phone.length > 15 ) return res.status(400).json({ error: "El número de teléfono es inválido" });

        const newDoctor = await DoctorServices.create( doctor );
        return res.status(201).json({ newDoctor });
        
    } catch (error) {
    
        return res.status(500).json({ error: error.message });
        
    }

}