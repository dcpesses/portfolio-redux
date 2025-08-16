import {render, screen} from '@testing-library/react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router';
import {Provider} from 'react-redux';
import {store} from '@/app/store';
import { mockWindowLocation, mockWindowHistory, restoreWindowHistory, restoreWindowLocation } from '@/../tests/mockWindowLocation';

import App, {AppLayout, AppRoutes} from '@/App';
import { JSX } from 'react/jsx-runtime';

global.fetch = vi.fn();

vi.mock('@/components/header', () => ({
  default: () => <div data-testid="HeaderMock" />
}));
vi.mock('@/pages/about', () => ({
  default: () => <div data-testid="AboutMock" />
}));
vi.mock('@/pages/contact', () => ({
  default: () => <div data-testid="ContactMock" />
}));
vi.mock('@/pages/not-found', () => ({
  default: () => <div data-testid="NotFoundMock" />
}));
vi.mock('@/pages/home', () => ({
  default: () => <div data-testid="HomeMock" />
}));
vi.mock('@/pages/projects', () => ({
  default: () => <div data-testid="ProjectsMock" />
}));
vi.mock('@/pages/thanks', () => ({
  default: () => <div data-testid="ThanksMock" />
}));


const basename = '/portfolio-redux';

const renderWithRouter = (route = '/', routes: RouteObject[] | { element: JSX.Element; children: { path: string; element: JSX.Element; }[]; }[], basename = '') => {
  mockWindowLocation(`http://localhost:5173${basename}${route}`);
  return render(
    <RouterProvider
      router={
        createBrowserRouter(routes, { basename })
      }
    />
  );
};

describe('App', () => {
  test('Should render without error', () => {
    const {container} = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container).toBeDefined();
  });

  describe('AppLayout', () => {
    test('Should render without error', () => {
      render(
        <RouterProvider
          router={
            createBrowserRouter(
              [{
                element: <AppLayout/>,
                children: [{ path: '*', element: <div data-testid="AppLayoutChildMock" />}]
              }],
              { basename: '/portfolio-redux' }
            )
          }
        />
      );
      expect(screen.getByTestId('HeaderMock')).toBeInTheDocument();
      expect(screen.getByTestId('AppLayoutChildMock')).toBeInTheDocument();
    });
  });

  describe('AppRoutes', () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ code: 200, }),
    } as Response);

    let routes: RouteObject[] | { element: JSX.Element; children: { path: string; element: JSX.Element; }[]; }[];
    beforeEach(() => {
      mockWindowHistory();
      routes = [{
        element: <AppLayout/>,
        children: AppRoutes
      }];
    });

    afterEach(() => {
      restoreWindowLocation();
      restoreWindowHistory();
    });

    test('Should render without error', () => {
      // mockWindowLocation(`http://localhost:5173${basename}/`);
      // const router = createBrowserRouter(routes, { basename });
      // render(<RouterProvider router={
      //   createBrowserRouter(routes, { basename })
      // } />);
      renderWithRouter('/', routes, basename);
      expect(screen.getByTestId('HomeMock')).toBeInTheDocument();
    });

    test('Should render About route', () => {
      renderWithRouter('/about', routes, basename);
      expect(screen.getByTestId('AboutMock')).toBeInTheDocument();
    });

    test('Should render Contact route', () => {
      renderWithRouter('/contact', routes, basename);
      expect(screen.getByTestId('ContactMock')).toBeInTheDocument();
    });

    test('Should render Home route', () => {
      const {container} = renderWithRouter('/', routes, basename);
      expect(container).toBeDefined();
    });

    test('Should render Projects route', () => {
      const {container} = renderWithRouter('/projects', routes, basename);
      expect(container).toBeDefined();
    });

    test('Should render Thanks route', () => {
      renderWithRouter('/thanks', routes, basename);
      expect(screen.getByTestId('ThanksMock')).toBeInTheDocument();
    });

    test('Should render NotFound route for unhandled routes', () => {
      renderWithRouter('/fubar', routes, basename);
      expect(screen.getByTestId('NotFoundMock')).toBeInTheDocument();
    });
  });
});

