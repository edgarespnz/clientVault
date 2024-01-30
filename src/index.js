const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');
const cors = require('cors');
 
//express global config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use(cors(corsOptions));

app.use('/api/v1', require('../src/controllers/user.controller'));
app.use('/api/v1', require('../src/controllers/login.controller'));

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

