



import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Capture the submitted values for this assignment.
    console.log("Contact form submitted:", formData);

    alert("Thank you! Your contact form has been submitted.");

    navigate("/");
  }

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

          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a
              className="contact-link"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=rasmil.salman@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              rasmil.salman@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">GitHub</span>
            <a
              className="contact-link"
              href="https://github.com/Razme369"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my GitHub
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">LinkedIn</span>
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

      <div className="contact-section contact-form-section">
        <h3>Send Me a Message</h3>

        <p>
          Please complete the form below to get in touch.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="contact-submit-button">
            Submit Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
