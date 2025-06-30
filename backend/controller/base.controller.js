// controller/base.controller.js
import db from "../config/database.js";

// GET all bases
export const getAllBases = async (req, res) => {
  try {
    const bases = await db.Base.findAll({
      attributes: ['base_id', 'base_name', 'location']
    });
    return res.json({ success: true, bases });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE new base
export const createBase = async (req, res) => {
  try {
    const { base_name, location } = req.body;
    if (!base_name || !location) {
      return res.status(400).json({ success: false, message: "Base name and location are required" });
    }

    const base = await db.Base.create({ base_name, location });
    return res.status(201).json({ success: true, base });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE existing base
export const updateBase = async (req, res) => {
  try {
    const { id } = req.params;
    const { base_name, location } = req.body;

    const base = await db.Base.findByPk(id);
    if (!base) {
      return res.status(404).json({ success: false, message: "Base not found" });
    }

    base.base_name = base_name || base.base_name;
    base.location = location || base.location;
    await base.save();

    return res.json({ success: true, base });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE a base
export const deleteBase = async (req, res) => {
  try {
    const { id } = req.params;
    const base = await db.Base.findByPk(id);

    if (!base) {
      return res.status(404).json({ success: false, message: "Base not found" });
    }

    await base.destroy();
    return res.json({ success: true, message: "Base deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
