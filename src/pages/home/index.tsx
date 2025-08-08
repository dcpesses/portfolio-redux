import Hero from '@/components/hero';

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
    </div>
  );
}

export default Home;
