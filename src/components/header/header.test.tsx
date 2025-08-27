import {render} from '@testing-library/react';
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

});
