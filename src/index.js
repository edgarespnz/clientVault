const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');
 
//express global config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', require('../src/controllers/user.controller'));

app.listen(PORT, async () => {
    console.log(`Server listening in port:${PORT}`);

    try {
        await db.sync({
            force: false
        });
    } catch (error) {
        console.log(error);
    }
});

