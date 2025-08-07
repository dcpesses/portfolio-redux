import {render} from '@testing-library/react';
import {LinkProps, NavLinkProps, PropsWithChildren} from '@/../tests/mockReactRouterHelper';
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
  test('Should render without error', () => {
    const {container} = render(<Home />);
    // expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });
});
