import db from "../config/database.js";
const AssetTransfer = db.AssetTransfer;
const { Op } = db.Sequelize;

export const getTransfers = async (req, res) => {
  const user = req.user;

  let whereClause = {};

  if (user.role === "base_commander") {
    whereClause = {
      [Op.or]: [
        { from_base_id: user.base_id },
        { to_base_id: user.base_id },
      ],
    };
  } else if (user.role === "logistics_officer") {
    whereClause = { created_by: user.user_id };
  }

  try {
    const transfers = await AssetTransfer.findAll({
      where: whereClause,
      include: [
        { model: db.Asset, as: "asset", attributes: ["name"] },
        { model: db.Base, as: "from_base", attributes: ["base_name"] },
        { model: db.Base, as: "to_base", attributes: ["base_name"] },
        { model: db.User, as: "creator", attributes: ["email"] },
      ],
      order: [["transfer_date", "DESC"]],
    });

    res.json(transfers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const createTransfer = async (req, res) => {
  const user = req.user;
  const { asset_id, from_base_id, to_base_id, quantity } = req.body;

  if (!asset_id || !from_base_id || !to_base_id || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Role-based permission check
  if (user.role !== "admin" && from_base_id !== user.base_id) {
    return res.status(403).json({
      message: "You are only allowed to transfer from your own base.",
    });
  }
  if(from_base_id=== to_base_id){
     return res.status(403).json({
      message: "You cannot transfer from your own base",
    });
  }

  try {
    const newTransfer = await AssetTransfer.create({
      asset_id,
      from_base_id,
      to_base_id,
      quantity,
      created_by: user.user_id,
    });

    res.status(201).json(newTransfer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

