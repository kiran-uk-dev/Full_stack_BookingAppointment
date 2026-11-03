const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./utils/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log('MySQL connected successfully');

        await sequelize.sync();

        console.log('User table created successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log('Database connection error:', error);
    }
}

startServer();