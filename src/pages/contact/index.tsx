import Header from '@/components/header';
import Footer from '@/components/footer';
import ContactForm from '@/features/contact-form';

import './contact.css';

function Contact() {
  return (
    <div id="page-contact" className="container px-3">
      <Header />
      <div className="text-center">

        <h3>Contact Me</h3>

        <hr />

        <ContactForm
          className="px-3 fs-6 text-start"
        />

      </div>
      <Footer />
    </div>
  );
}

export default Contact;
