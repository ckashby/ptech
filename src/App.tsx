import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CreatePet } from './pages/CreatePet';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Main from './pages/Main';
import { PetsList } from './pages/PetsList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pets" element={<PetsList />} />
          <Route path="/create-pet" element={<CreatePet />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
