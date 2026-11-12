
import { useEffect, useState } from "react";

function Education() {
  const API_URL = "http://localhost:5000/api/qualifications";

  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    completionDate: "",
    description: "",
  });

  // Check whether the logged-in user is an administrator
  const currentUser = JSON.parse(
    sessionStorage.getItem("user") || "null"
  );

  const token = sessionStorage.getItem("token");
  const isAdmin = currentUser?.role === "admin";

  // Read qualifications from MongoDB
  const fetchQualifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load qualifications.");
      }

      setQualifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  // Update form values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update a qualification
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Please enter a title and description.");
      return;
    }

    if (!token) {
      setError("Please sign in as an administrator.");
      return;
    }

    try {
      setIsSubmitting(true);

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save qualification.");
      }

      setMessage(
        editingId
          ? "Qualification updated successfully!"
          : "Qualification added successfully!"
      );

      setFormData({
        title: "",
        completionDate: "",
        description: "",
      });

      setEditingId(null);

      await fetchQualifications();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load qualification into the form for editing
  const handleEdit = (qualification) => {
    setFormData({
      title: qualification.title,
      completionDate: qualification.completionDate
        ? qualification.completionDate.slice(0, 10)
        : "",
      description: qualification.description,
    });

    setEditingId(qualification._id);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      title: "",
      completionDate: "",
      description: "",
    });

    setMessage("");
    setError("");
  };

  // Delete qualification
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this qualification?")) {
      return;
    }

    if (!token) {
      setError("Please sign in as an administrator.");
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete qualification.");
      }

      setMessage("Qualification deleted successfully!");

      await fetchQualifications();
    } catch (err) {
      setError(err.message);
    }
  };

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

      {/* MongoDB Qualifications */}
      <div className="education-content">
        <div className="education-section">

          <h3>Additional Qualifications</h3>

          {/* Admin-only form */}
          {isAdmin && (
            <form onSubmit={handleSubmit}>
              <h4>
                {editingId ? "Edit Qualification" : "Add Qualification"}
              </h4>

              <div>
                <label>Qualification Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter qualification title"
                  required
                />
              </div>

              <div>
                <label>Completion Date</label>
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter qualification description"
                  required
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : editingId
                    ? "Update Qualification"
                    : "Add Qualification"}
              </button>

              {editingId && (
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </form>
          )}

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          {/* Public qualification display */}
          

          {loading && <p>Loading qualifications...</p>}

          {!loading && qualifications.length === 0 && (
            <p>No additional qualifications have been added yet.</p>
          )}

          {!loading && qualifications.map((qualification) => (
            <div key={qualification._id} className="qualification-item">

              <h4>{qualification.title}</h4>

              {qualification.completionDate && (
                <p>
                  <strong>Completion Date:</strong>{" "}
                  {new Date(qualification.completionDate).toLocaleDateString()}
                </p>
              )}

              <p>{qualification.description}</p>

              {isAdmin && (
                <div>
                  <button
                    type="button"
                    onClick={() => handleEdit(qualification)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(qualification._id)}
                  >
                    Delete
                  </button>
                </div>
              )}

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Education;
