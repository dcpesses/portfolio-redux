import ContactForm from '@/features/contact-form';

import './contact.css';

function Contact() {
  return (
    <div id="page-contact" className="container page">
      <div className="text-center">

        <h3>Contact Me</h3>

        <hr />

        <ContactForm
          className="px-3 fs-6 text-start"
          redirectOnSuccess={true}
        />

      </div>
    </div>
  );
}

export default Contact;
