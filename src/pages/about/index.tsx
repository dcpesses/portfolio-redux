import profilePhoto from '@/assets/profile-photo.jpg';

import './about.css';

function About() {
  return (
    <div id="page-about" className="container page">
      <div id="bio" className="row justify-content-center">
        <div id="photo" className="col-sm-4 col-md-3 text-center text-sm-end">
          <img src={profilePhoto} id="photo" className="img-fluid rounded-2 mx-auto mb-1" alt="App Screenshot" />
        </div>
        <div className="col-sm-8 col-md-7">
          <p className="mb-4 fs-6 fs-md-5 lh-base">
            Seasoned, results-driven Senior Web Developer with extensive experience in ReactJS, Node.js, and a wide array of modern web development tools and frameworks. Excel in crafting innovative web applications for major entertainment and media companies, with a knack for bridging technical excellence with creative flair.
          </p>
          <p className="mb-4 fs-6 fs-md-5 lh-base">
            Most recently played a pivotal role in building and maintaining several in-house video streaming apps for multiple platforms, currently used to promote high-profile media for content licensing and award nominations as well as VIP screening events.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
