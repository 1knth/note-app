import axios from 'axios';

export const getNotes = async () => {
    try {
        const res = await axios.get('http://localhost:5001/api/notes');
        return res.data;
    } catch (error) {
        console.error("Error in getNotes API: ", error);
        //protect map function in homepage.jsx
        throw error;
    }
};
export const getNote = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error in getNote API: ", error);
        throw error;
    }
};

export const createNote = async (title) => {
    try {
        const res = await axios.post(`http://localhost:5001/api/notes/${title}`);
        return res.data;
    } catch (error) {
        console.error("Error in createNote API:", error);
        throw error;
    }
}

export const saveNote = async (id, content) => {
    try {
        const res = await axios.put(`http://localhost:5001/api/notes/${id}`, content);
        return res.data;
    } catch (error) {
        console.error(`Error in saveNote API`, error);
    }
}

