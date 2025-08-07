import Realistic from 'react-canvas-confetti/dist/presets/realistic';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ThanksCheck from '@/assets/checkmark.svg?react';
import ThanksCircleFill from 'bootstrap-icons/icons/circle-fill.svg?react';

import './thanks.css';

function Thanks() {

  const autorunOptions = {
    delay: 1000,
    duration: 1000,
    speed: 0.3
  };

  return (
    <div id="page-thanks" className="container page">
      <Header />

      <div className="text-center">

        <div className="thanks-icons">
          <div className="thanks-circle">
            <ThanksCircleFill className="text-success" width="96px" height="96px" />
          </div>
          <div className="thanks-checkmark scale-in">
            <ThanksCheck className="text-light" width="96px" height="96px" />
          </div>
        </div>

        <div id="confetti">
          <Realistic autorun={autorunOptions} />
        </div>

        <h2 className="pt-4">
          Thank You!
        </h2>

        <div className="py-3">
          Your message has been sent successfully. Thanks for reaching out!
        </div>
      </div>

      <Footer />
    </div>

  );
}

export default Thanks;
