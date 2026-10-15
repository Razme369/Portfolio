function About() {
  return (
    <div className="about-page">

      <div className="about-header">
        <p className="about-tag">ABOUT ME</p>

        <h1>About Me</h1>

        <h2>Bridging Software, Technology & Automation</h2>
      </div>

      <div className="about-content">

        {/* Profile Image */}
        <div className="about-profile">
          <img
            src="/profile.jpg"
            alt="Mohammed Rasmil Poovan Kulam"
            className="about-profile-image"
          />

          <h3>Mohammed Rasmil</h3>

          <p className="about-role">
            Software Engineering Technology Student
          </p>

          {/* Résumé PDF Link */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-button"
          >
            View My Résumé
          </a>
        </div>

        <p>
          I am a Software Engineering Technology student at Centennial
          College with a multidisciplinary background combining software,
          robotics, automation, customer support, and industrial operations.
        </p>

        <p>
          Before focusing on software engineering, I studied
          Electromechanical Engineering Technology with a focus on
          robotics. This gave me hands-on experience with mechanical
          systems, electronics, automation, PLC fundamentals, hydraulics,
          pneumatics, and robotic systems.
        </p>

        <p>
          My current studies have expanded my technical foundation into
          software development, databases, web technologies, programming,
          and software requirements.
        </p>

        <p>
          What makes my background different is the combination of
          software knowledge and practical technical experience. I am
          interested in opportunities where I can use both sides to
          understand problems and develop practical solutions.
        </p>

        <h3>My Approach</h3>

        <p>
          I believe in learning by doing. I enjoy taking a problem,
          understanding how the system works, and finding a practical way
          to improve or solve it.
        </p>

      </div>

    </div>
  );
}

export default About;