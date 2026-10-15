function Education() {
  return (
    <div className="education-page">

      <div className="education-header">
        <h1>EDUCATION</h1>

        <h2>Building a Foundation in Software & Automation</h2>
      </div>

      <div className="education-content">

        {/* Software Engineering Education */}
        <div className="education-section">
          <h3>Centennial College</h3>

          <h4>Software Engineering Technician</h4>

          <p>
            <strong>Study Period:</strong> May 2024 – Present
          </p>

          <p>
            <strong>Qualification Status:</strong>{" "}
            <span className="education-status">In Progress</span>
          </p>

          <p>
            Currently studying Software Engineering Technology at Centennial
            College, developing a foundation in software development,
            databases, web technologies, programming, and software
            documentation.
          </p>

          <h4>Key Areas of Study</h4>

          <ul>
            <li>Java Programming</li>
            <li>Web Development</li>
            <li>Web Application Development</li>
            <li>Database Development and SQL</li>
            <li>Software Requirements and Documentation</li>
            <li>Object-Oriented Programming</li>
            <li>System and Application Design</li>
          </ul>
        </div>

        {/* Robotics Education */}
        <div className="education-section">
          <h3>Centennial College</h3>

          <h4>Electromechanical Engineering Technician – Robotics</h4>

          <p>
            <strong>Study Period:</strong> January 2017 – December 2019
          </p>

          <p>
            <strong>Qualification Status:</strong>{" "}
            <span className="education-status">Completed</span>
          </p>

          <p>
            My previous technical education focused on robotics,
            electromechanical systems, and automation.
          </p>

          <h4>Key Areas of Study</h4>

          <ul>
            <li>Robotics and Automation</li>
            <li>PLC Fundamentals</li>
            <li>Electronics</li>
            <li>Hydraulics and Pneumatics</li>
            <li>Mechanical Systems</li>
            <li>Machine Shop Practices</li>
            <li>Industrial Maintenance</li>
          </ul>

          <p>
            This combination of software and engineering education has
            helped me develop both technical and practical problem-solving
            skills.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Education;