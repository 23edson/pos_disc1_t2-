import { DataTypes, ForeignKey, Model, NonAttribute, } from "sequelize";
import sequelize from "@/config/db";
import User from "./user";

/**
 * Classe que representa um Student
 */
class Student extends Model {

    declare id: number
    declare name: string;
    declare birthday: Date;
    declare user_id: ForeignKey<User>
    declare createdAt: Date;
    declare updatedAt: Date;

    declare user?: NonAttribute<User>

    static associate(): void {

        //define a relação das tabelas students e user
        Student.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
    }

}

/**
 * Colunas da tabela Student
 */
Student.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            key: 'id',
            model: User
        }
    }

}, {
    sequelize,
    tableName: 'students',
    timestamps: true
})

Student.associate()

export default Student
