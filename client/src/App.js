import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import TestDrives from './pages/TestDrives';
import { NotFound } from './pages/NotFound';
import Navigation from './pages/Navigation';
import AdminPanel from './pages/AdminPanel';
import Registration from './pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/registration' element={<Registration/>}/>
            <Route path='/test-drive' element={<TestDrives/>}/>
            <Route path='/admin' element={<AdminPanel/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;