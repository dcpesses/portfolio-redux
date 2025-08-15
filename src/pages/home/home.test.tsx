import {render} from '@testing-library/react';
import {LinkProps, NavLinkProps, PropsWithChildren} from '@/../tests/mockReactRouterHelper';
import { getStoreWithState } from '@/app/store';
import { Provider } from 'react-redux';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import Home from './index';

vi.mock('react-router', () => {
  const reactRouter = vi.importActual('react-router');
  return {
    ...reactRouter,
    Link: ({children, to, ...props}: LinkProps) => (
      <a href={to.toString()} {...props}>
        {children}
      </a>
    ),
    NavLink({children = null, to, ...props}: PropsWithChildren<Omit<NavLinkProps, 'className' | 'style'>>) {
      return (
        <a href={to.toString()} {...props}>
          {children}
        </a>
      );
    },
  };
});

describe('Home', () => {
  let store: Store<unknown, UnknownAction, unknown>;
  beforeEach(() => {
    store = getStoreWithState();
  });
  test('Should render without error', () => {
    const {container} = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(container).toBeDefined();
  });
});
