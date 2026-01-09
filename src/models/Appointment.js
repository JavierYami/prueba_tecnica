import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Appointment = sequelize.define("Appointment", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'ACTIVE'
    }

});




