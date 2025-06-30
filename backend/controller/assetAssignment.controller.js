import db from '../config/database.js';

const { AssetAssignment, BaseAsset, Personnel, Base, Asset, User, Role } = db;

export const getAssetAssignments = async (req, res) => {
  const user = req.user;

  try {
    const whereClause = user.role === "base_commander" ? { base_id: user.base_id } : {};

    const assignments = await db.AssetAssignment.findAll({
      where: whereClause,
      include: [
        { model: db.Personnel },
        { model: db.Base },
        { model: db.Asset }
      ],
      order: [['assigned_date', 'DESC']]
    });

    res.status(200).json({ assignments });
  } catch (err) {
    //console.error("Assignment fetch error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const createAssignment = async (req, res) => {
  try {
    const { personnel_id, base_id, asset_id, quantity } = req.body;
    const user = req.user;

    if (!personnel_id || !base_id || !asset_id || !quantity) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Ensure base commander is assigning only to his base
    if (user.role.role_name === 'base_commander' && user.base_id !== base_id) {
      return res.status(403).json({ success: false, message: 'You can assign only within your base' });
    }

    const baseAsset = await BaseAsset.findOne({
      where: { base_id, asset_id }
    });

    if (!baseAsset) {
      return res.status(400).json({ success: false, message: 'Asset not available in this base' });
    }

    const availableQty = baseAsset.total_quantity - baseAsset.assigned_quantity - baseAsset.expended_quantity;

    if (quantity > availableQty) {
      return res.status(400).json({
        success: false,
        message: `Not enough available quantity. Available: ${availableQty}`
      });
    }

    // Proceed to create assignment
    await AssetAssignment.create({ personnel_id, base_id, asset_id, quantity });

    // Update BaseAsset assigned quantity
    baseAsset.assigned_quantity += Number(quantity);
    await baseAsset.save();

    res.status(201).json({ success: true, message: 'Asset assigned successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message:  err.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await AssetAssignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    const baseAsset = await BaseAsset.findOne({
      where: { base_id: assignment.base_id, asset_id: assignment.asset_id }
    });

    if (baseAsset) {
      baseAsset.assigned_quantity -= assignment.quantity;
      if (baseAsset.assigned_quantity < 0) baseAsset.assigned_quantity = 0;
      await baseAsset.save();
    }

    await assignment.destroy();
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message:  err.message });
  }
};
