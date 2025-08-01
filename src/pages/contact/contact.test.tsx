import {render} from '@testing-library/react';
import Contact from './index';

describe('Contact', () => {
  test('Should render without error', () => {
    const {container} = render(<Contact />);
    expect(container).toBeDefined();
  });
});
