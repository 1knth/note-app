import dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });
import express from 'express';
import cors from 'cors';

import notesRoutes from './routes/notes.routes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
const PORT = process.env.PORT || 5001;

const app = express(); // initialize web server

//middleware
app.use(cors());
app.use(express.json()); // allows us to get access to req.body 
// app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on PORT: ", PORT);
    });
});
    

