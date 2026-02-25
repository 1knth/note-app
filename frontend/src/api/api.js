
const fetchNotes = async (req, res) => {
    try {
        const list = await fetch('/api/notes/getAllNotes');
        res.status(200).json(list);
    } catch (error) {
        console.log("Error in fetchNotes API: ", error);
        res.status(404).json({message: "Error getting all notes."});
    }
};