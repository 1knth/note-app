import axios from 'axios';

const fetchNotes = async () => {
    try {
        const res = await axios.get('http://localhost:5001/api/notes');
        console.log(res);
        return res.data;
    } catch (error) {
        console.log("Error in fetchNotes API: ", error);
        //protect map function in homepage.jsx
        return [];
    }
};

export default fetchNotes;