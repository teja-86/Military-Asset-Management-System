// controllers/purchase.controller.js
import { Op } from 'sequelize';
import db from '../config/database.js';


export const createPurchase = async (req, res) => {
  try {
    const { role, base_id: userBaseId, user_id } = req.user;
    const { base_id, asset_id, quantity, amount, purchase_date } = req.body;
    console.log(req.body);
    if (!base_id || !asset_id || !quantity || !amount || quantity <= 0 || amount <= 0) {
      return res.status(400).json({ success: false, message: "All fields are required and must be valid" });
    }

    if (role === "base_commander" && base_id !== userBaseId) {
      return res.status(403).json({ success: false, message: "You can only create purchases for your base" });
    }

    if (role === "logistics_officer") {
      return res.status(403).json({ success: false, message: "You are not allowed to create purchases" });
    }

    const purchase = await db.Purchase.create({
      base_id,
      asset_id,
      quantity,
      amount,
      purchase_date: purchase_date || new Date(),
      created_by: user_id
    });

    res.status(201).json({ success: true, purchase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message:  err.message });
  }
};


export const getPurchases = async (req, res) => {
  try {
    const { role, base_id: userBaseId } = req.user;
    const { baseId, assetId, date } = req.query;

    const where = {};

    if (role === "base_commander") {
      where.base_id = userBaseId;
    } else if ((role === "admin" || role === "logistics_officer") && baseId) {
      where.base_id = baseId;
    }

    if (assetId) {
      where.asset_id = assetId;
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      where.purchase_date = { [Op.between]: [start, end] };
    }

    const purchases = await db.Purchase.findAll({
      where,
      include: [
        { model: db.Asset, attributes: ['name'] },
        { model: db.Base, attributes: ['base_name'] },
        { model: db.User, as: 'creator', attributes: ['email'] }
      ],
      order: [['purchase_date', 'DESC']]
    });

    res.status(200).json({ success: true, purchases });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
