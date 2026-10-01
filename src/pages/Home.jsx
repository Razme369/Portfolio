import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <div className="hero-section">

        <p className="hero-tag">
          SOFTWARE • TECHNOLOGY • AUTOMATION
        </p>

        <h1>Hi, I'm Mohammed Rasmil</h1>

        <h2>
          Software Engineering Student with a Background in
          Robotics & Automation
        </h2>

        <p className="hero-description">
          I combine software knowledge with hands-on experience in
          robotics, automation, technical support, and industrial
          operations to understand problems and build practical solutions.
        </p>

        <div className="hero-buttons">

          <Link to="/about" className="primary-button">
            Explore My Portfolio
          </Link>

          <Link to="/contact" className="secondary-button">
            Get In Touch
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;