import db from "../config/database.js";

const Personnel = db.Personnel;
const Base = db.Base;

export const getAllPersonnel = async (req, res) => {
  try {
    const { role, base_id: userBaseId } = req.user;

    const where = {};
    if (role === "base_commander") {
      where.base_id = userBaseId; // Restrict to only the commander's base
    }

    const personnel = await Personnel.findAll({
      where,
      include: {
        model: Base,
        as: "base",
        attributes: ["base_id", "base_name"],
      },
      order: [["created_at", "DESC"]],
    });

    res.json({ success: true, personnel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPersonnel = async (req, res) => {
  const { name, base_id } = req.body;
  if (!name || !base_id) {
    return res.status(400).json({ success: false, message: "Name and base_id are required" });
  }

  try {
    const created = await Personnel.create({ name, base_id });
    res.status(201).json({ success: true, personnel: created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePersonnel = async (req, res) => {
  const { id } = req.params;
  const { name, base_id } = req.body;

  if (!name || !base_id) {
    return res.status(400).json({ success: false, message: "Name and base_id are required" });
  }

  try {
    const personnel = await Personnel.findByPk(id);
    if (!personnel) {
      return res.status(404).json({ success: false, message: "Personnel not found" });
    }

    await personnel.update({ name, base_id });
    res.json({ success: true, message: "Personnel updated" });
  } catch (error) {
    // console.error(err);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePersonnel = async (req, res) => {
  const { id } = req.params;

  try {
    const personnel = await Personnel.findByPk(id);
    if (!personnel) {
      return res.status(404).json({ success: false, message: "Personnel not found" });
    }

    await personnel.destroy();
    res.json({ success: true, message: "Personnel deleted" });
  } catch (err) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
