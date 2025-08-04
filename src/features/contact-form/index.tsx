import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

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
  disabled = false
}) {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: { currentTarget: HTMLFormElement; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form:HTMLFormElement = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const formProps:FormProps = {
    action: 'https://formcarry.com/s/uLWRmem9Gqc',
    acceptCharset: 'UTF-8',
    encType: 'multipart/form-data',
    method: 'POST',
  };

  return (
    <Form
      id="contact-form"
      className={className}
      noValidate validated={validated}
      action={formProps.action}
      acceptCharset={formProps.acceptCharset}
      encType={formProps.encType}
      method={formProps.method}
      onSubmit={handleSubmit}
      data-testid="contact-form"
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

      <div style={{opacity:0, position:'absolute', top:0, left:'-5000px', height:0, width:0}}>
        <label htmlFor="subscribe_a7fdfc1ea41e_48062"></label>
        <input name="subscribe_a7fdfc1ea41e_48062" value="" tabIndex={-1} autoComplete="off"
          type="email" id="email_subscribe_a7fdfc1ea41e_48062" placeholder="Your email here" onChange={noop} disabled={disabled} />
        <input type="hidden" name="_next" value="https://yourthank.you/page" />
      </div>
      <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" value="" autoComplete="off" onChange={noop} disabled={disabled} />

      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </Form>
  );
}

ContactForm.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default ContactForm;
export { noop };
