import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {LinkProps, NavLinkProps, PropsWithChildren} from '@/../tests/mockReactRouterHelper';
import { getStoreWithState } from '@/app/store';
import { Provider } from 'react-redux';
import Projects from './index';
import { Store, UnknownAction } from '@reduxjs/toolkit';

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

describe('Projects', () => {
  let store: Store<unknown, UnknownAction, unknown>;
  beforeEach(() => {
    store = getStoreWithState();
  });
  test('Should render without error', () => {
    const {container} = render(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    expect(container).toBeDefined();
  });

  test('Should open and close modal', async() => {
    vi.useFakeTimers({ toFake: ['queueMicrotask', 'requestAnimationFrame'] });

    render(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    expect(screen.queryByRole('dialog')).toBeNull();

    const btnViewInfo = await screen.findByTestId('view-info-0');
    await userEvent.click(btnViewInfo);

    const dialogElement = await screen.findByRole('dialog');
    expect(dialogElement).toBeDefined();

    const btnClose = screen.getByLabelText('Close');
    await userEvent.click(btnClose);

    vi.advanceTimersByTime(1500);

    expect(screen.queryByRole('dialog')).toBeNull();

    vi.useRealTimers();
  });
});
