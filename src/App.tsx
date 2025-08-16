import { Outlet, createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router';
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

const AppRoutes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About />},
  { path: '/projects', element: <Projects />},
  { path: '/contact', element: <Contact />},
  { path: '/thanks', element: <Thanks />},
  { path: '/umami', element: <UmamiTest />},
  { path: '*', element: <NotFound />},
];

function AppLayout() {
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
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}



function App() {
  const router = createBrowserRouter(
    [{
      element: <AppLayout/>,
      children: AppRoutes
    }],
    { basename: '/portfolio-redux' }
  );
  return <RouterProvider router={router} />;
}

export default App;
export { AppLayout, AppRoutes };

