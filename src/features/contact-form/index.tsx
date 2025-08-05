import { useState, useRef, FormEvent } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { redirect } from 'react-router';
import { Turnstile } from '@marsidev/react-turnstile';
import './contact-form.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
const noop = (_e: any) => {};

interface FormProps {
  action: string;
  acceptCharset: string;
  encType: string;
  method: string;
}

function ContactForm({
  className = '',
  disabled = false,
  redirectOnSuccess = false,
}) {
  const formRef = useRef(null);

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const formProps:FormProps = {
    action: 'https://formcarry.com/s/uLWRmem9Gqc',
    acceptCharset: 'UTF-8',
    encType: 'multipart/form-data',
    method: 'POST',
  };

  const resetStates = () => {
    setSubmitted(false);
    setError('');
  };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form:HTMLFormElement = event.currentTarget as HTMLFormElement;
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() !== false) {
      onSubmit(event);
    }

  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    resetStates();

    if (!formRef.current) {
      console.warn('something wrong with form ref');
      setError('Sorry, your message cannot be sent right now. Please try again later.');
      return;
    }

    const formData = new FormData(formRef.current);

    setLoading(true);
    fetch(formProps.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        if (response.code === 200) {
          if (redirectOnSuccess === true) {
            return redirect('/thanks');
          } else {
            setSubmitted(true);
          }
        } else if (response.code === 422) {
        // Field validation failed
          setError(response.message);
        } else {
        // other error from formcarry
          setError(`${response.title}: ${response.message}`);
        }
      })
      .catch(error => {
        setLoading(false);
        // request related error.
        setError(error.message ? error.message : error);
      });
  };

  const showNotification = submitted || error;

  function renderStatus() {
    const heading = error ? 'Oh Snap!' : 'Success!';
    const message = error ? `Error sending form: ${error}` : 'Your message was sent successfully. Thanks for reaching out!';
    const icon = error ? 'exclamation-triangle-fill' : 'check-circle-fill';
    const variant = error ? 'danger' : 'success';

    return (
      <div className="form-notification">
        <Alert variant={variant} onClose={resetStates} dismissible>
          <Alert.Heading>
            <i className={`bi bi-${icon}`} />
            {' '}
            {heading}
          </Alert.Heading>
          <div className="alert-content">{message}</div>
        </Alert>
      </div>
    );
  }

  return (
    <Form
      id="contact-form"
      className={className}
      noValidate validated={validated}
      // action={formProps.action}
      // acceptCharset={formProps.acceptCharset}
      // encType={formProps.encType}
      // method={formProps.method}
      // onSubmit={handleSubmit}
      data-testid="contact-form"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <Row className="pb-3">
        <Form.Group controlId="contact.Full_Name" className="col-sm-6">
          <Form.Label>Full Name <span>*</span></Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="First and Last Name"
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your full name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="contact.Email_Address" className="col-sm-6">
          <Form.Label>Email Address <span>*</span></Form.Label>
          <Form.Control
            required
            type="email"
            name="Email Address"
            placeholder="your@email.com"
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="pb-3">
        <Form.Group controlId="contact.Message">
          <Form.Label>Message <span>*</span></Form.Label>
          <Form.Control
            required
            as="textarea"
            name="message"
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your message.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div className="text-center">
        <Turnstile siteKey="0x4AAAAAABnorjomER4bbtKv" />
      </div>

      <div style={{opacity:0, position:'absolute', top:0, left:'-5000px', height:0, width:0}}>
        <label htmlFor="subscribe_a7fdfc1ea41e_48062"></label>
        <input name="subscribe_a7fdfc1ea41e_48062" value="" tabIndex={-1} autoComplete="off"
          type="email" id="email_subscribe_a7fdfc1ea41e_48062" placeholder="Your email here" onChange={noop} disabled={disabled} />
      </div>
      <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" value="foo" autoComplete="off" onChange={noop} disabled={disabled} />

      <div className="text-center">
        <Button type="submit" disabled={disabled}>
          {loading ? (
            <>
              <Spinner size="sm" animation="border" role="status" /> Sending
            </>
          ) : (
            <>
              Send Message
            </>
          )}
        </Button>
        {showNotification && renderStatus()}
      </div>
    </Form>
  );
}

ContactForm.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  redirectOnSuccess: PropTypes.bool,
};

export default ContactForm;
export { noop };
