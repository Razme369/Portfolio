
import express from "express";
import Qualification from "../models/Qualification.js";

const router = express.Router();

// GET all qualifications
router.get("/", async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new qualification
router.post("/", async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);
    res.status(201).json(qualification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
