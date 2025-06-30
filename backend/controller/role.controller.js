import db from "../config/database.js";
export const getAllRoles = async (req, res) => {
  try {
    const roles = await db.Role.findAll({ attributes: ["role_id", "role_name"] });
    res.json({ success:true,roles });
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};