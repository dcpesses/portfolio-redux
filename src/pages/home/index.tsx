import Header from '@/components/header';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

import './home.css';

declare global {
  interface Window {
    lastUpdated: string;
  }
}

function Home() {
  return (
    <div id="page-home" className="container px-3">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;
