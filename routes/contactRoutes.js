

import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware, {
  authorizeAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC: Submit contact form (no login required)
router.post("/submit", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      message
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        message: "All contact fields are required."
      });
    }

    const contact = await Contact.create({
      firstName,
      lastName,
      contactNumber,
      email,
      message
    });

    res.status(201).json({
      message: "Contact form submitted successfully.",
      contact
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// GET all contact submissions (Admin and regular users)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a contact record (Admin only)
router.post("/", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a contact submission (Admin only)
router.put("/:id", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a contact submission (Admin only)
router.delete("/:id", authMiddleware, authorizeAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

