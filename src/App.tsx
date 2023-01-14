import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import { AddToy } from './pages/AddToy';
import { CreatePet } from './pages/CreatePet';
import CreatePost from './pages/CreatePost';
import { GamesList } from './pages/GamesList';
import Login from './pages/Login';
import Main from './pages/Main';
import { PetsList } from './pages/PetsList';
// import { ToysList } from './pages/ToysList';

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
          {/* <Route path='/toys' element={<ToysList />} /> */}
          {/* <Route path='/add-toy' element={<AddToy />} /> */}
          <Route path='/games' element={<GamesList />} />
          <Route path='/add-game' element={<h3>Add Games</h3>} />
          <Route path='*' element={<h3>Page Not Found - 404</h3>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
