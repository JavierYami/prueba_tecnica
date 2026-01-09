import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Appointment = sequelize.define("Appointment", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    doctor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Appointment: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Appointment: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
    }

});




