import { Routes, Route } from 'react-router';
import Contact from '@/pages/contact';
import Demo from '@/pages/demo';
import Home from '@/pages/home';
import Thanks from '@/pages/thanks';
import NotFound from '@/pages/not-found';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import '@/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
