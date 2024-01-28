'use strict';
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    static associate(models) {
        // define association here
    }
}

User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'User',
});

module.exports = {User};