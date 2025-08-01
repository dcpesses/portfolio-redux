import { Routes, Route } from 'react-router-dom';
import Contact from '@/pages/contact';
import Demo from '@/pages/demo';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
