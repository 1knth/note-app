import mongoose from 'mongoose';

//create schema
// create model based on schema 

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed
    },
}, {timestamps: true}); // createdAt, updatedAt

const Note = mongoose.model("Note", noteSchema); 
export default Note;