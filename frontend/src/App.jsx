import {Routes, Route} from 'react-router';
import React from 'react'
import HomePage from './pages/HomePage.jsx';
import NoteDetailPage from './pages/NoteDetailsPage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import Navbar from './components/Navbar.jsx';
const App = () => {
  return (
    <div className='bg-gray-500'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<CreatePage />}></Route>
        <Route path='/note/:id' element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  )
};

export default App;
