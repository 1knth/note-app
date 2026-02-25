// import dotenv from 'dotenv';
// dotenv.config({ path: './env/.env' });import express from 'express';

import express from 'express';
import notesRoutes from './routes/notes.routes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
const PORT = process.env.PORT || 5001;

const app = express(); // initialize web server
connectDB();

//middleware
app.use(express.json()); // allows us to get access to req.body 
// app.use((req,res,next) => {    
//     console.log("\nNew Request:")
//     console.log("\nMethod: ", req.method, "\nBody: ", req.body, "\nURL: ", req.url, "\nHeader: ", req.header );
    
//     next();
// });

app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log("App listening on PORT: ", PORT);
});
    

