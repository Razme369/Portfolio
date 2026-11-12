
import express from "express";
import Project from "../models/Project.js";
import authMiddleware, {
  authorizeAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all projects (Public access - no login required)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new project (Admin only)
router.post("/", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a project (Admin only)
router.put("/:id", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a project (Admin only)
router.delete("/:id", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({
      message: "Project deleted successfully."
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

