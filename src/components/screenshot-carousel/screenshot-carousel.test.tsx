import {render} from '@testing-library/react';
import ScreenshotCarousel from './index';

describe('ScreenshotCarousel', () => {
  test('Should render wihtout error', () => {
    const {container} = render(
      <ScreenshotCarousel screenshots={[]} title="Mock Title" />
    );
    expect(container).toBeDefined();
  });
});
