

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/projects";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = JSON.parse(
    sessionStorage.getItem("user") || "null"
  );

  const isAdmin = currentUser?.role === "admin";
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completionDate: "",
  });

  const [editingId, setEditingId] = useState(null);

  // GET: Load projects from MongoDB (Public access)
  async function fetchProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load projects.");
      }

      setProjects(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // POST: Add project / PUT: Update project (Admin only)
  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Please enter a project title and description.");
      return;
    }

    if (!token || !isAdmin) {
      setError("Administrator login is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Project operation failed.");
      }

      setMessage(
        editingId
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      setFormData({
        title: "",
        description: "",
        completionDate: "",
      });

      setEditingId(null);

      await fetchProjects();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Edit: Load project information into the form
  function handleEdit(project) {
    setEditingId(project._id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      completionDate: project.completionDate
        ? new Date(project.completionDate).toISOString().split("T")[0]
        : "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Cancel editing
  function handleCancel() {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      completionDate: "",
    });

    setMessage("");
    setError("");
  }

  // DELETE: Remove project (Admin only)
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    if (!token || !isAdmin) {
      setError("Administrator login is required.");
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete project.");
      }

      setMessage("Project deleted successfully!");

      await fetchProjects();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="projects-page">

      <div className="projects-header">
        <h1>Projects & Experience</h1>

        <h2>
          Academic Projects, Technical Experience & Practical Skills
        </h2>

        <p>
          Here are some of the academic and practical experiences that
          have helped me develop my technical and problem-solving skills.
        </p>
      </div>

      <div className="projects-content">

        {/* Admin-only project form */}
        {isAdmin && (
          <div className="project-section">

            <h3>
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="title">Project Title</label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Project Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter project description"
                  required
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="completionDate">
                  Completion Date
                </label>

                <input
                  type="date"
                  id="completionDate"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : editingId
                    ? "Update Project"
                    : "Add Project"}
              </button>

              {editingId && (
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              )}

            </form>
          </div>
        )}

        {/* Success and error messages */}
        {message && <p className="success-message" role="status">{message}</p>}

        {error && <p className="error-message" role="alert">{error}</p>}

        {/* Public project list */}
        <div className="project-list">

          {loading && <p>Loading projects...</p>}

          {!loading && !error && projects.length === 0 && (
            <p>No projects have been added yet.</p>
          )}

          {!loading && projects.map((project) => (
            <div className="project-section" key={project._id}>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              {project.completionDate && (
                <p className="technology">
                  <strong>Completion Date:</strong>{" "}
                  {new Date(project.completionDate).toLocaleDateString()}
                </p>
              )}

              {/* Admin-only Edit and Delete buttons */}
              {isAdmin && (
                <div>
                  <button
                    type="button"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(project._id)}
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

export default Projects;
