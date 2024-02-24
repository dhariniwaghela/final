//Dharini Vaghela -200533763 - 23rd Feb , 2023
//required Libraries to create Express Api
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: './config.env' });

//mongodb url to connect api to database
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const database = mongoose.connection;

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://0.0.0.0:3000", optionsSuccessStatus: 200 }));
app.use(express.json());

//Upload the Json file data to mongodb database
const Task = require('./models/task');
const JSON_FILE_PATH = 'taskdata.json';

database.on('error', console.error.bind(console, 'MongoDB connection error:'));

database.once('open', async () => {
    console.log('Database connected');
    try {
        const existingRecordsCount = await Task.countDocuments();
        if (existingRecordsCount === 0) {
            fs.readFile(JSON_FILE_PATH, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading JSON file:', err);
                } else {
                    try {
                        const jsonData = JSON.parse(data);
                        await Task.create(jsonData);
                        console.log('Data uploaded to MongoDB');
                    } catch (err) {
                        console.error('Error uploading data to MongoDB:', err);
                    }
                }
            });
        } else {
            console.log('Database already contains records. No data uploaded.');
        }
    } catch (err) {
        console.error('Error checking database for existing records:', err);
    }
});

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});