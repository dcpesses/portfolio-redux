import Header from '@/components/header';
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
      <Footer />
    </div>
  );
}

export default Home;
