const express = require('express');
const userService = require('../services/user.service');

const router = express.Router();

router.post('/user', async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.createUser(userData);

        if (result.success) {
            return res.status(201).json(result.user);
        } else {
            return res.status(400).json({
                message: result.message
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUser(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
})

router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const result = await userService.putUser(id, userData);
        if (result.success) {
            return res.status(200).json(result.user);
        } else {
            return res.status(400).json({
                message: result.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUser(id);
        if (result.success) {
            return res.status(200).json({
                message: result.message
            });
        } else {
            return res.status(400).json({
                message: result.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});

module.exports = router;