import Hero from '@/components/hero';
import Projects from '@/features/projects';

import './home.css';

declare global {
  interface Window {
    lastUpdated: string;
  }
}

function Home() {
  return (
    <div id="page-home" className="container page">
      <Hero />
      <Projects />
    </div>
  );
}

export default Home;
