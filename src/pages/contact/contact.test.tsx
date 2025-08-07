import {render} from '@testing-library/react';
import {LinkProps, NavLinkProps, PropsWithChildren} from '@/../tests/mockReactRouterHelper';
import Contact from './index';


vi.mock(('@marsidev/react-turnstile'), async(importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    Turnstile: vi.fn(() => {
      // Return the mock component defined above or a simple div
      return <div data-testid="mock-turnstile"></div>;
    }),
  };
});

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
    useNavigate: vi.fn().mockReturnValue({
      navigate: vi.fn()
    }),
  };
});

describe('Contact', () => {
  test('Should render without error', () => {
    const {container} = render(<Contact />);
    expect(container).toBeDefined();
  });
});
