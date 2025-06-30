import db from '../config/database.js';
import { Op } from 'sequelize';

export const getDashboardStats = async (req, res) => {
  try {
    const { role, base_id: userBaseId } = req.user;
    const { baseId, startDate, endDate, assetId } = req.query;

    // Build filters
    const baseFilter = {};
    if (role === 'base_commander') {
      baseFilter.base_id = userBaseId;
    } else if (role === 'admin' && baseId) {
      baseFilter.base_id = baseId;
    }

    const assetFilter = assetId ? { asset_id: assetId } : {};
    const dateFilter = startDate && endDate
      ? { created_at: { [Op.between]: [startDate, endDate] } }
      : {};

    // Fetch bases and base-assets with optional asset filter
    const bases = await db.Base.findAll({
      where: baseFilter,
      include: [{
        model: db.BaseAsset,
        include: [{ model: db.Asset, where: assetFilter }]
      }]
    });

    const stats = [];

    for (const base of bases) {
      for (const ba of base.BaseAssets) {
        const assetId = ba.asset_id;
        const currentBaseId = base.base_id;

        // Prepare where conditions safely
        const wherePurchase = {
          base_id: currentBaseId,
          asset_id: assetId,
          ...dateFilter
        };

        const whereTransferIn = {
          to_base_id: currentBaseId,
          asset_id: assetId,
          ...dateFilter
        };

        const whereTransferOut = {
          from_base_id: currentBaseId,
          asset_id: assetId,
          ...dateFilter
        };

        const whereAssigned = {
          base_id: currentBaseId,
          asset_id: assetId,
          ...dateFilter
        };

        const whereExpended = {
          base_id: currentBaseId,
          asset_id: assetId,
          ...dateFilter
        };

        const [
          purchases = 0,
          transfersIn = 0,
          transfersOut = 0,
          assigned = 0,
          expended = 0
        ] = await Promise.all([
          db.Purchase.sum('quantity', { where: wherePurchase }),
          db.AssetTransfer.sum('quantity', { where: whereTransferIn }),
          db.AssetTransfer.sum('quantity', { where: whereTransferOut }),
          db.AssetAssignment.sum('quantity', { where: whereAssigned }),
          db.AssetExpenditure.sum('quantity', { where: whereExpended }),
        ]);

        const opening = ba.available_quantity;
        const closing = opening + purchases + transfersIn - transfersOut - assigned - expended;

        stats.push({
          base_id: currentBaseId,
          base_name: base.base_name,
          asset_id: assetId,
          asset_name: ba.Asset?.name || 'Unknown',
          opening_balance: opening,
          purchases,
          transfers_in: transfersIn,
          transfers_out: transfersOut,
          assigned,
          expended,
          closing_balance: closing,
        });
      }
    }

    return res.status(200).json({ success: true, data: stats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message:  err.message,
    });
  }
};
