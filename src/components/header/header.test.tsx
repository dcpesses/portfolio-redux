import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import {LinkProps, NavLinkProps, PropsWithChildren} from '@/../tests/mockReactRouterHelper';

import Header from './index';

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
    useSearchParams: () => [{ get: (str: string) => str }],
    useNavigate: vi.fn().mockReturnValue({
      navigate: vi.fn()
    }),
    useLocation: vi.fn().mockReturnValue({
      pathname: 'pathname',
    }),
  };
});


describe('Header', () => {
  test('Should render as expected', () => {
    const {container} = render(<Header />);
    expect(container).toBeDefined();
  });
  test('Should open and close the "Coming Soon" modal', async() => {
    render(<Header />);
    const aboutLink = screen.getByText('About');
    await userEvent.click(aboutLink);
    const modalElement = screen.queryByRole('dialog');
    expect(modalElement).toBeInTheDocument();

    const closeBtn = screen.getByText('Close');
    await userEvent.click(closeBtn);
    const modalElement2 = screen.queryByRole('dialog');
    expect(modalElement2).not.toBeInTheDocument();
  });

});
