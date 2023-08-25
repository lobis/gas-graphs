import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (

    <div>
      <div>
      <Router basename='/gas-graphs'>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
