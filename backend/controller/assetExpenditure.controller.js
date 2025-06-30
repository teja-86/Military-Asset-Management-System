// controllers/assetExpenditure.controller.js

import db from "../config/database.js";

export const getAssetExpenditures = async (req, res) => {
  try {
    const user = req.user;

    const whereClause = user.role === 'base_commander'
      ? { base_id: user.base_id }
      : {};

    const expenditures = await db.AssetExpenditure.findAll({
      where: whereClause,
      include: [
        { model: db.Personnel },
        { model: db.Base },
        { model: db.Asset }
      ],
      order: [['expended_date', 'DESC']]
    });

    res.status(200).json({ expenditures });
  } catch (err) {
    console.error("Failed to fetch expenditures:", err);
    res.status(500).json({ message: err.message });
  }
};

export const createAssetExpenditure = async (req, res) => {
  const { personnel_id, asset_id, quantity, status } = req.body;

  try {
    if (!personnel_id || !asset_id || !quantity || !status || quantity < 0) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    const personnel = await db.Personnel.findByPk(personnel_id);
    if (!personnel) return res.status(404).json({ message: "Personnel not found" });

    const base_id = personnel.base_id;

    const baseAsset = await db.BaseAsset.findOne({ where: { base_id, asset_id } });
    if (!baseAsset) return res.status(404).json({ message: "Asset not found in base" });

    const totalAssigned = await db.AssetAssignment.sum("quantity", {
      where: { personnel_id, asset_id }
    }) || 0;

    const totalExpended = await db.AssetExpenditure.sum("quantity", {
      where: { personnel_id, asset_id, status: "EXPENDED" }
    }) || 0;

    const totalReturned = await db.AssetExpenditure.sum("quantity", {
      where: { personnel_id, asset_id, status: "RETURNED" }
    }) || 0;

    const currentHolding = totalAssigned - totalExpended - totalReturned;

    if (status === "EXPENDED") {
      if (quantity > currentHolding) {
        return res.status(400).json({
          message: `Insufficient holding. You only have ${currentHolding} units.`,
        });
      }
    }

    if (status === "RETURNED") {
      if (quantity > currentHolding) {
        return res.status(400).json({
          message: `Cannot return more than you currently hold (${currentHolding}).`,
        });
      }

      baseAsset.total_quantity += quantity;
      baseAsset.available_quantity += quantity;
      await baseAsset.save();
    }

    const newExp = await db.AssetExpenditure.create({
      personnel_id,
      base_id,
      asset_id,
      quantity,
      status,
    });

    return res.status(201).json({ message: "Recorded successfully", expenditure: newExp });

  } catch (err) {
    console.error("Expenditure creation error:", err);
    res.status(500).json({ message: err.message });
  }
};
