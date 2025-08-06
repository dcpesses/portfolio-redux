import {render} from '@testing-library/react';
import Footer from './index';

describe('Footer', () => {
  test('Should render as expected', () => {
    const {container} = render(<Footer />);
    expect(container).toBeDefined();
  });
});
