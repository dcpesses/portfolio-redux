/* eslint-env jest */
import { vi } from 'vitest';

import {render} from '@testing-library/react';
import ContactForm from './index';

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
  const reactRouterDom = vi.importActual('react-router');
  return {
    ...reactRouterDom,
    useNavigate: () => ({
      navigate: vi.fn()
    }),
  };
});

describe('ContactForm', () => {
  test('Should render without error', () => {
    const {container} = render(<ContactForm />);
    expect(container).toBeDefined();
  });
});
