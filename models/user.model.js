import { Model, DataTypes } from "sequelize";

export class User extends Model{}

User.init({
    PK_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    var_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    var_email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    var_password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false
    } 
},
{
    sequelize,
    modelName: "t_user",
    tableName: "tbl_user",
    timestamps: true
}
)