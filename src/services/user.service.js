const { User } = require('../models/user.model');
const Sequelize = require('../db');
const bcrypt = require('bcrypt');

async function createUser(userData) {
    const t = await Sequelize.transaction();

    try {
        const existingUser = await User.findOne({
            where: {
                email: userData.email
            }
        });
        if (existingUser) {
            await t.rollback();
            return {
                success: false,
                message: 'User already exists'
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        // New object with hashed password
        const hashedUserData = {
            ...userData,
            password: hashedPassword
        };

        const user = await User.create(hashedUserData, { transaction: t });
        await t.commit();

        //Remove password from response building a new object
        const { password, ...userWithoutPassword } = user.dataValues;
        return {
            success: true,
            message: 'User created successfully',
            user: userWithoutPassword
        };
    }
    catch (error) {
        await t.rollback();
        return {
            success: false,
            message: 'Error creating user',
            error: error.message
        };
    }
}

async function getUser(id) {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        //Remove password from response building a new object
        const { password, ...userWithoutPassword } = user.dataValues;
        return userWithoutPassword;
    } catch (error) {
        throw error.message;
    }
}

//Only used to validate credentials in login
async function getUserByEmail(email) {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        return user;
    } catch (error) {
        throw error.message;
    }
}

async function putUser(id, userData) {
    const t = await Sequelize.transaction();
    try {
        const user = await User.findByPk(id);
        if (!user) {
            await t.rollback();
            return {
                success: false,
                message: 'User not found'
            };
        }

        delete userData.password;
        const updatedUser = await user.update(userData, {fields: Object.keys(userData)});
        await t.commit();

        //Remove password from response building a new object
        const { password, ...userWithoutPassword } = updatedUser.dataValues;
        return {
            success: true,
            message: 'User updated successfully',
            user: userWithoutPassword
        };

    } catch (error) {
        await t.rollback();
        return {
            success: false,
            message: 'Error updating user',
            error: error.message
        };
    }
}

async function deleteUser(id) {
    const t = await Sequelize.transaction();
    try {
        const user = await User.findByPk(id);
        if (!user) {
            await t.rollback();
            return {
                success: false,
                message: 'User not found'
            };
        }
        await user.destroy();
        await t.commit();
        return {
            success: true,
            message: 'User deleted successfully'
        };
    } catch (error) {
        await t.rollback();
        return {
            success: false,
            message: 'Error deleting user',
            error: error.message
        };
    }

}



module.exports = {
    createUser,
    getUser,
    putUser,
    deleteUser,
    getUserByEmail
}