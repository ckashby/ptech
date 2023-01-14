import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AddGame } from './pages/AddGame';
import { GamesList } from './pages/GamesList';
import { CreatePet } from './pages/CreatePet';
import { PetsList } from './pages/PetsList';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/pets" element={<PetsList />} />
          <Route path="/create-pet" element={<CreatePet />} />
          <Route path='/games' element={<GamesList />} />
          <Route path='/add-game' element={<AddGame />} />
          <Route path='*' element={<h3>Page Not Found - 404</h3>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
