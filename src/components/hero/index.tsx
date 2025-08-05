import Avatar from '@/assets/avatar.svg?react';

import './hero.css';

export default function Hero() {
  const socials = [
    // {color: '#1DA1F2', name: 'Twitter', url: 'https://www.twitter.com/dcpesses'},
    // {color: '#4267B2', name: 'Facebook', url: 'https://www.facebook.com/dcpesses'},
    {color: '#000000', name: 'GitHub', url: 'https://www.github.com/dcpesses'},
    {color: '#0077B5', name: 'LinkedIn', url: 'https://www.linkedin.com/in/dcpesses'},
    {color: '#FF0000', name: 'Youtube', url: 'https://www.youtube.com/dcpesses'},
    {color: '#6441A4', name: 'Twitch', url: 'https://www.twitch.com/dcpesses'},
  ];

  const showSocials = () => socials.map(platform => (
    <a key={platform.name} className="fs-2 hover-text-white" href={platform.url}>
      <i className={`bi bi-${platform.name.toLowerCase()}`} aria-label={`${platform.name} icon`}></i>
    </a>
  ));

  return (
    <section id="hero" className="container py-4 px-3">
      <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-between gap-4">
        <div>
          <h1 className="h3 fw-bold">
            Hi there, I&lsquo;m <span className="gradient-text">Danny Pesses</span> 👋
          </h1>
          <p className="mt-4 fs-5 lh-base">
            A passionate senior web developer from Los Angeles specializing in crafting innovative web applications using ReactJS, Node.js, and modern development practices.
            <a href="#" className="text-cyan hover-underline"></a>
          </p>
          <div className="mt-3 d-flex gap-2 justify-content-center">
            {showSocials()}
          </div>
        </div>
        <div className="flex-shrink-0">
          <Avatar
            id="hero-avatar"
            className="img-fluid"
            style={{ height: '320px', width: '256px' }}
            data-label="Avatar of Danny Pesses"
          />
        </div>
      </div>
    </section>
  );
}
