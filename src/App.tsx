import { Routes, Route } from 'react-router';
import { UmamiAnalytics } from '@giof/react-umami';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import Home from '@/pages/home';
import Projects from '@/pages/projects';
import Thanks from '@/pages/thanks';
import NotFound from '@/pages/not-found';
import UmamiTest from '@/umami-test';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import '@/App.css';

function App() {
  return (
    <div className="App raleway">
      <UmamiAnalytics
        websiteId={import.meta.env.VITE_UMAMI_WEBSITE_ID}
        src="https://cloud.umami.is/script.js"
        // domains={['dcpesses.github.io', 'localhost']}
        // autoTrack={false}
        dryRun={process.env.NODE_ENV === 'test'}
        debug={process.env.NODE_ENV === 'development'}
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/umami" element={<UmamiTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
