import {render} from '@testing-library/react';
import Home from './index';

interface LinkProps {
  className: string,
  to: string,
  children: React.ReactNode
}

vi.mock('react-router-dom', () => {
  const reactRouterDom = vi.importActual('react-router-dom');
  return {
    ...reactRouterDom,
    Link: ({className, to, children}: LinkProps) => (
      <div className={className} data-to={to}>
        {children}
      </div>
    )
  };
});

describe('Home', () => {
  test('Should render without error', () => {
    const {container} = render(<Home />);
    // expect(container).toMatchSnapshot();
    expect(container).toBeDefined();
  });
});
