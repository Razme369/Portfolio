

import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// GET all contact submissions
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new contact submission
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
