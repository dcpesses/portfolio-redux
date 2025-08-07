/* eslint-env jest */
import { vi, Mock } from 'vitest';
import React from 'react';
import {render, screen} from '@testing-library/react';
import {UserEvent, userEvent} from '@testing-library/user-event';
import ContactForm, {noop} from './index';

global.fetch = vi.fn();
const mockNavigate = vi.fn();

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
    useNavigate: () => mockNavigate,
  };
});

describe('ContactForm', () => {
  let onFormSubmitSpy: Mock;
  let setValidated: React.Dispatch<React.SetStateAction<boolean>>;
  let user: UserEvent;

  beforeEach(()=>{
    onFormSubmitSpy = vi.fn();
    setValidated = vi.fn();
    user = userEvent.setup();
    mockNavigate.mockClear();
  });

  const onFormSubmit = (event: SubmitEvent) => {
    const form:HTMLFormElement = event.currentTarget as HTMLFormElement;

    // spy on data via mock.calls
    const formData = new FormData(form);
    const formDataEntries = [...formData.entries()]
      .reduce((acc: Record<string, FormDataEntryValue>, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    onFormSubmitSpy(formDataEntries);

    // actual logic
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
    }
  };

  test('Should render without error', () => {
    const {container} = render(<ContactForm />);
    expect(container).toBeDefined();
  });

  test('Should submit and display notification when form has valid data', async() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ code: 200, }),
    } as Response);

    render(<ContactForm redirectOnSuccess={false} />);

    const form = screen.getByTestId('contact-form');
    form.onsubmit = onFormSubmit;
    expect(form).toMatchSnapshot('pristine');

    const nameInput:HTMLInputElement = screen.getByPlaceholderText('First and Last Name');
    const emailInput:HTMLInputElement = screen.getByPlaceholderText('your@email.com');
    const messageInput:HTMLInputElement = screen.getByPlaceholderText('Enter your message here...');
    const btnSubmit:HTMLButtonElement = screen.getByRole('button', { name: 'Send Message' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(messageInput, 'I love this app!');

    await userEvent.click(btnSubmit);

    expect(onFormSubmitSpy).toHaveBeenCalled();
    expect(onFormSubmitSpy.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "Email Address": "john.doe@example.com",
        "g-recaptcha-response": "",
        "message": "I love this app!",
        "name": "John Doe",
        "subscribe_a7fdfc1ea41e_48062": "",
      }
    `);
    expect(setValidated).toHaveBeenCalled();
    expect(form.classList).toContain('was-validated');
    expect(form).toMatchSnapshot('dirty');

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.classList.contains('alert-success')).toBeTruthy();
  });

  test('Should submit and navigate to Thanks page when form has valid data', async() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ code: 200, }),
    } as Response);

    render(<ContactForm redirectOnSuccess={true} />);

    const form = screen.getByTestId('contact-form');
    form.onsubmit = onFormSubmit;

    const nameInput:HTMLInputElement = screen.getByPlaceholderText('First and Last Name');
    const emailInput:HTMLInputElement = screen.getByPlaceholderText('your@email.com');
    const messageInput:HTMLInputElement = screen.getByPlaceholderText('Enter your message here...');
    const btnSubmit:HTMLButtonElement = screen.getByRole('button', { name: 'Send Message' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(messageInput, 'I love this app!');

    await userEvent.click(btnSubmit);

    expect(onFormSubmitSpy).toHaveBeenCalled();
    expect(setValidated).toHaveBeenCalled();
    expect(form.classList).toContain('was-validated');

    expect(mockNavigate).toHaveBeenCalledWith('/thanks');

  });

  test('Should not submit and display alert message when form has invalid or missing data', async() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ code: 200, }),
    } as Response);

    render(<ContactForm redirectOnSuccess={false} />);

    const form = screen.getByTestId('contact-form');
    form.onsubmit = onFormSubmit;

    const nameInput:HTMLInputElement = screen.getByPlaceholderText('First and Last Name');
    const btnSubmit:HTMLButtonElement = screen.getByRole('button', { name: 'Send Message' });

    await user.type(nameInput, 'John Doe');

    await userEvent.click(btnSubmit);

    expect(onFormSubmitSpy).toHaveBeenCalled();
    expect(onFormSubmitSpy.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "Email Address": "",
        "g-recaptcha-response": "",
        "message": "",
        "name": "John Doe",
        "subscribe_a7fdfc1ea41e_48062": "",
      }
    `);
    expect(setValidated).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();

    const alert = screen.queryByRole('alert');
    expect(alert).toBeNull();
  });

  test('Should submit and display alert message on form submission errors', async() => {

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({
        'code': 400,
        'status': 'error',
        'title': 'Turnstile Validation Failed',
        'message': [
          'The response parameter is invalid or malformed.'
        ]
      }),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve({
        'code': 422,
        'status': 'error',
        'message': [
          'Unprocessable Content'
        ]
      }),
    } as Response).mockRejectedValueOnce({
      json: () => Promise.resolve({
        'code': 500,
        'status': 'error',
        'message': [
          'Internal Server Error'
        ]
      }),
    } as Response);

    render(<ContactForm redirectOnSuccess={false} />);

    const form = screen.getByTestId('contact-form');
    form.onsubmit = onFormSubmit;
    expect(form).toMatchSnapshot('pristine');

    const nameInput:HTMLInputElement = screen.getByPlaceholderText('First and Last Name');
    const emailInput:HTMLInputElement = screen.getByPlaceholderText('your@email.com');
    const messageInput:HTMLInputElement = screen.getByPlaceholderText('Enter your message here...');
    const btnSubmit:HTMLButtonElement = screen.getByRole('button', { name: 'Send Message' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(messageInput, 'I love this app!');

    // first click
    await userEvent.click(btnSubmit);
    // second click
    await userEvent.click(btnSubmit);
    // third click
    await userEvent.click(btnSubmit);

    expect(onFormSubmitSpy).toHaveBeenCalledTimes(3);

    expect(setValidated).toHaveBeenCalled();
    expect(form.classList).toContain('was-validated');

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.classList.contains('alert-danger')).toBeTruthy();
  });

  test('Should display alert message on caught errors', async() => {
    vi.spyOn(React, 'useRef').mockReturnValue({current: null});
    vi.spyOn(global, 'fetch').mockRejectedValueOnce({
      message: 'Internal Server Error',
    });

    render(<ContactForm redirectOnSuccess={false} />);

    const form = screen.getByTestId('contact-form');
    form.onsubmit = onFormSubmit;
    expect(form).toMatchSnapshot('pristine');

    const nameInput:HTMLInputElement = screen.getByPlaceholderText('First and Last Name');
    const emailInput:HTMLInputElement = screen.getByPlaceholderText('your@email.com');
    const messageInput:HTMLInputElement = screen.getByPlaceholderText('Enter your message here...');
    const btnSubmit:HTMLButtonElement = screen.getByRole('button', { name: 'Send Message' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(messageInput, 'I love this app!');

    await userEvent.click(btnSubmit);

    expect(onFormSubmitSpy).toHaveBeenCalled();

    expect(setValidated).toHaveBeenCalled();
    expect(form.classList).toContain('was-validated');

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.classList.contains('alert-danger')).toBeTruthy();
  });
});

describe('noop', () => {
  test('should execute without error', () => {
    expect(noop({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>)).toBeUndefined();
  });
});
