function Contact() {
  return (
    <div className="contact-page">

      <div className="contact-header">

        <h1>Let's Connect</h1>

        <h2>Get In Touch</h2>

        <p>
          I am interested in opportunities where I can continue developing
          my technical skills while contributing to real-world projects
          and solving practical problems.
        </p>

      </div>


      <div className="contact-content">


        <div className="contact-section">

          <h3>About My Career Interests</h3>

          <p>
            With a background that combines software engineering, robotics,
            automation, IT, and hands-on technical experience, I bring a
            multidisciplinary perspective to technology and problem solving.
          </p>

          <h4>What I Am Interested In</h4>

          <ul>
            <li>IT and Technical Support</li>
            <li>Software and Technology</li>
            <li>Automation and Robotics</li>
            <li>Technical Analyst Roles</li>
            <li>Technology Operations</li>
            <li>Entry-Level Technology Opportunities</li>
          </ul>

        </div>


        <div className="contact-section">

          <h3>Contact Information</h3>

          <p>
            If you would like to learn more about my background or discuss
            an opportunity, I would be happy to connect.
          </p>


          {/* EMAIL */}

          <div className="contact-item">

            <span className="contact-label">
              Email
            </span>

            <a
              className="contact-link"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=rasmil.salman@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              rasmil.salman@gmail.com
            </a>

          </div>


          {/* GITHUB */}

          <div className="contact-item">

            <span className="contact-label">
              GitHub
            </span>

            <a
              className="contact-link"
              href="https://github.com/Razme369"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my GitHub
            </a>

          </div>


          {/* LINKEDIN */}

          <div className="contact-item">

            <span className="contact-label">
              LinkedIn
            </span>

            <a
              className="contact-link"
              href="https://www.linkedin.com/in/mohammed-rasmil-poovan-kulam-5b1a76170/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my LinkedIn
            </a>

          </div>


        </div>

      </div>

    </div>
  );
}

export default Contact;
