import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router';
import {Provider} from 'react-redux';
import {store} from '@/app/store';

import Demo from './index';

describe('Demo', () => {
  test('Should render as expected', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter>
          <Demo />
        </BrowserRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
  test('Should render with Home link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Demo />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
