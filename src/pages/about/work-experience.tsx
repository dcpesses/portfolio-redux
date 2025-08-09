export default function WorkExperience({...props}) {
  return (
    <div id="work-experience" className="row justify-content-sm-start justify-content-md-center mt-3" {...props}>

      <div className="col-sm-4 col-lg-3 text-center text-sm-end">

        <h4 className="mb-4">Work Experience</h4>

      </div>

      <div className="work-list col-sm-8 col-lg-7">
        <div className="role">
          <p><span>Senior Web Developer,</span> <i>Digital Media / Studio &amp; Industry Engagement</i></p>
          <p><a href="https://www.wbd.com/">Warner Bros. Discovery</a> &middot; Full-time</p>
          <p>Nov 2021 - Aug 2023</p>
          <p>Burbank, CA - Hybrid</p>
        </div>
        <div className="role">
          <p><span>Senior Web Developer,</span> <i>The CW Digital</i></p>
          <p><a href="https://www.warnerbros.com/">Warner Bros. Entertainment</a> &middot; Full-time</p>
          <p>Feb 2012 - Jun 2015</p>
          <p>Burbank, CA - On-Site</p>
        </div>
        <div className="role">
          <p><span>Web Developer,</span> <i>WWTVM Digital Media</i></p>
          <p><a href="https://www.ep.com/">Entertainment Partners</a> &middot; Full-time</p>
          <p>Feb 2011 - Feb 2012</p>
          <p>Burbank, CA - On-Site</p>
        </div>
        <div className="role">
          <p><span>Flash / Web Developer</span></p>
          <p>Freelance &middot; Part-time</p>
          <p>May 2006 - May 2011</p>
          <p>Los Angeles, CA - Remote</p>
        </div>
        <div className="role">
          <p><span>Creative Developer</span></p>
          <p><a href="https://www.americangreetings.com/">American Greetings Interactive</a> &middot; Full-time</p>
          <p>Sep 2007 - Sep 2010</p>
          <p>Los Angeles, CA - On-Site</p>
        </div>
        {/* <div className="role">
          <p><span>Computer Consultant / Technoguru</span></p>
          <p>Hillel at Cal State Northridge &middot; Volunteer</p>
          <p>Sep 2003 - Sep 2007</p>
          <p>Northridge, CA - On-Site</p>
        </div> */}
        <div className="role">
          <p><span>Production Assistant,</span> <i>Parks & Resorts Online</i></p>
          <p><a href="https://disneyparks.disney.go.com/">The Walt Disney Company</a> &middot; Part-time</p>
          <p>Dec 2004 - May 2005</p>
          <p>North Hollywood, CA - On-Site</p>
        </div>
        <div className="role">
          <p><span>Paid Intern, </span> <i>Technical Operations</i></p>
          <p><a href="https://www.warnerbros.com/">Warner Bros. Entertainment</a> &middot; Part-time</p>
          <p>Jan 2002 - May 2002</p>
          <p>Jan 2003 - May 2003</p>
          <p>Glendale, CA - On-Site</p>
        </div>
      </div>
    </div>
  );
}
