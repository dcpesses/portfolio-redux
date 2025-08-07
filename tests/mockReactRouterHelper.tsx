import { type PropsWithChildren } from 'react';
import { type LinkProps, type NavLinkProps } from 'react-router';

/**
 * Just re-exporting some handy types and including boilerplate mocking in the comments
 *
 * import {LinkProps, NavLinkProps, PropsWithChildren} from '@/../tests/mockReactRouterHelper';
 *
 * vi.mock('react-router', () => {
 *   const reactRouter = vi.importActual('react-router');
 *   return {
 *     ...reactRouter,
 *     Link: ({children, to, ...props}: LinkProps) => (
 *       <a href={to.toString()} {...props}>
 *         {children}
 *       </a>
 *     ),
 *     NavLink({children = null, to, ...props}: PropsWithChildren<Omit<NavLinkProps, 'className' | 'style'>>) {
 *       return (
 *         <a href={to.toString()} {...props}>
 *           {children}
 *         </a>
 *       );
 *     },
 *     useSearchParams: () => [{ get: (str: string) => str }],
 *     useNavigate: vi.fn().mockReturnValue({
 *       navigate: vi.fn()
 *     }),
 *     useLocation: vi.fn().mockReturnValue({
 *       pathname: 'pathname',
 *     }),
 *   };
 * });
 *
 */

const noop = () => {};

const MockReactRouterHelper = {
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
  useNavigate: () => ({
    navigate: noop()
  }),
  useLocation: () => ({
    pathname: 'pathname',
  }),
};

export default MockReactRouterHelper;
export { noop, type LinkProps, type NavLinkProps, type PropsWithChildren };
