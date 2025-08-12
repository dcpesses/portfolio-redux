import { render, screen } from '@testing-library/react';
import { type FC, type PropsWithChildren} from 'react';

import DropdownTrackedItem, {eventValueText} from './index';

describe('DropdownTrackedItem', () => {
  test('Should render without error', () => {
    const {container} = render(<DropdownTrackedItem />);
    expect(container).toBeDefined();
  });
  test('Should render with determined event props', () => {
    const {container} = render(
      <DropdownTrackedItem
        href="mock.link"
      >
        foo
      </DropdownTrackedItem>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="dropdown-item"
          data-rr-ui-dropdown-item=""
          data-umami-event="dropdown-link-click"
          data-umami-event-value="mock.link"
          href="mock.link"
        >
          foo
        </a>
      </div>
    `);
  });
  test('Should render with defined event props', () => {
    const {container} = render(
      <DropdownTrackedItem
        href="mock.link"
        eventName="mock-event"
        eventValue="mock-value"
      >
        foo
      </DropdownTrackedItem>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="dropdown-item"
          data-rr-ui-dropdown-item=""
          data-umami-event="mock-event"
          data-umami-event-value="mock-value"
          href="mock.link"
        >
          foo
        </a>
      </div>
    `);
  });

  test('Should render non-link with defined event props', () => {
    const {container} = render(
      <DropdownTrackedItem
        eventName="mock-event"
        eventValue="mock-value"
      >
        foo
      </DropdownTrackedItem>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="dropdown-item"
          data-rr-ui-dropdown-item=""
          data-umami-event="mock-event"
          data-umami-event-value="mock-value"
          href="#"
          role="button"
          tabindex="0"
        >
          foo
        </a>
      </div>
    `);
  });
  test('Should render non-link with derived event props', () => {
    const {container} = render(
      <DropdownTrackedItem>
        <div>
          omg
          <span>
            dylan
            <i>
              wth
            </i>
          </span>
        </div>
        foo
        <br />
        <>
          bar
        </>
      </DropdownTrackedItem>
    );
    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="dropdown-item"
          data-rr-ui-dropdown-item=""
          data-umami-event="dropdown-click"
          data-umami-event-value="omg-dylan-wth-foo-bar"
          href="#"
          role="button"
          tabindex="0"
        >
          <div>
            omg
            <span>
              dylan
              <i>
                wth
              </i>
            </span>
          </div>
          foo
          <br />
          bar
        </a>
      </div>
    `);
  });


  describe('eventValueText', () => {

    const TextWrapper: FC<PropsWithChildren> = ({ ...props }) => (
      <div data-testid="only">{eventValueText(props.children)}</div>
    );

    test('Should handle all children types and any nested elements', async() => {
      render(
        <TextWrapper>
          <span>0</span>
          <b>1</b>
          <span>
            <i>2</i>
          </span>
          three
          {null}
          {4}
          <div />
          {true}
          {false}
          <i>five</i>
        </TextWrapper>,
      );

      const { textContent } = await screen.findByTestId('only');
      expect(textContent).toEqual('0-1-2-three-4-five');
    });

    test('Should handle empty values', async() => {
      render(<TextWrapper />);

      const { textContent } = await screen.findByTestId('only');
      expect(textContent).toEqual('');
    });
    test('Should handle object values', async() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MockObject: any = () => ({});
      const children:React.ReactElement = MockObject();
      const textContent = eventValueText(children);

      expect(textContent).toEqual('');
    });

  });
});
