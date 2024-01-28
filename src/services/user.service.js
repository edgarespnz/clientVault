const { User } = require('../models/user.model');
const Sequelize = require('../db');

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
        const user = await User.create(userData, { transaction: t });
        await t.commit();
        return {
            success: true,
            message: 'User created successfully',
            user: user
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
        const updatedUser = await user.update(userData);
        await t.commit();
        return {
            success: true,
            message: 'User updated successfully',
            user: updatedUser
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
    deleteUser
}