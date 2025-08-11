import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router';
import {Provider} from 'react-redux';
import {store} from '@/app/store';
import {mockWindowLocation} from '@/../tests/mockWindowLocation';

import App from '@/App';

global.fetch = vi.fn();

vi.mock('@/pages/about', () => ({
  default: () => <div data-testid="AboutMock" />
}));
vi.mock('@/pages/contact', () => ({
  default: () => <div data-testid="ContactMock" />
}));
vi.mock('@/pages/not-found', () => ({
  default: () => <div data-testid="NotFoundMock" />
}));
vi.mock('@/pages/thanks', () => ({
  default: () => <div data-testid="ThanksMock" />
}));

describe('App', () => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve({ code: 200, }),
  } as Response);

  const originalLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalLocation,
    });
  });

  test('Should render About route', () => {
    mockWindowLocation('http://localhost:5173/about');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('AboutMock')).toBeInTheDocument();
  });
  test('Should render Contact route', () => {
    mockWindowLocation('http://localhost:5173/contact');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('ContactMock')).toBeInTheDocument();
  });
  test('Should render Home route', () => {
    mockWindowLocation('http://localhost:5173/');
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(container).toBeDefined();
    // expect(container).toMatchSnapshot();  // no snapshots during active development
  });
  test('Should render Thanks route', () => {
    mockWindowLocation('http://localhost:5173/thanks');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('ThanksMock')).toBeInTheDocument();
  });
  test('Should render NotFound route for unhandled routes', () => {
    mockWindowLocation('http://localhost:5173/fubar');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('NotFoundMock')).toBeInTheDocument();
  });
});
