import {Routes, Route} from 'react-router';
import React from 'react'
import HomePage from './pages/HomePage.jsx';
import NoteDetailPage from './pages/NoteDetailsPage.jsx';
import CreatePage from './pages/CreatePage.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<CreatePage />}></Route>
        <Route path='/note/:id' element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  )
};

export default App;
