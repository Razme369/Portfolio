
import express from "express";
import Qualification from "../models/Qualification.js";
import authMiddleware, {
  authorizeAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all qualifications (Admin and regular users)
router.get("/", async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.status(200).json(qualifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new qualification (Admin only)
router.post("/", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);
    res.status(201).json(qualification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a qualification (Admin only)
router.put("/:id", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found."
      });
    }

    res.status(200).json(qualification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a qualification (Admin only)
router.delete("/:id", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(
      req.params.id
    );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found."
      });
    }

    res.status(200).json({
      message: "Qualification deleted successfully."
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
