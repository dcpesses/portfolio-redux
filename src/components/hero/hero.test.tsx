import {render} from '@testing-library/react';
import Hero from './index';

describe('Hero', () => {
  test('Should render without errors', () => {
    const {container} = render(<Hero />);
    expect(container).toBeDefined();
  });
});
