import Note from '../models/Note.js';


export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find()
            .sort({createdAt: -1}); // newest first

        res.status(200).json(notes);
    } catch (error) {
        console.error( "Error in readNote controller ", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function getNoteById(req, res) {
    try {
        const notes = await Note.findById(req.params.id);
        if (!notes) {
            return res.status(404).json({message: "No note found"});
        }
        res.status(200).json(notes);
    } catch (error) {
        console.error( "Error in getNoteById controller ", error);
        res.status(500).json({message:"internal server error"});
    }
}


export async function createNote(req, res) {
    try {
        const title = req.params.title;
        const newNote = new Note({title: title, content:""});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller ", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function updateNote(req, res) {
    try {
        const content = req.body;
        console.log(content);
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {content}, {new: true, upsert: true}); 
        if (!updatedNote) { // if note id does not exist -> exit
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller ", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function deleteNote(req, res) {
    try {
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id, {title,content}); 
        if (!deletedNote) { // if note id does not exist -> exit
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNote controller ", error);
        res.status(500).json({message:"internal server error"});
    }
}