import { DataTypes, Model, } from "sequelize";
import sequelize from "@/config/db";

/**
 * Classe que representa um User
 */
class User extends Model {

    declare id: number;
    declare login: string;
    declare password: string;
    declare createdAt: Date;
    declare updatedAt: Date;

}

/**
 * Colunas da tabela User
 */
User.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },



}, {
    sequelize,
    tableName: 'users',
    timestamps: true,

})

export default User
