
import db from "../config/database.js";

export const getBaseAssetsForBase = async (req, res) => {
  const { base_id } = req.params;

  if (!base_id) return res.status(400).json({ message: "Base ID required" });

  try {
    const assets = await db.BaseAsset.findAll({
      where: { base_id },
      include: [{ model: db.Asset }],
    });

    const enriched = assets.map(asset => ({
      ...asset.toJSON(),
      available_quantity: asset.total_quantity - asset.assigned_quantity - asset.expended_quantity,
    }));

    res.status(200).json({ assets: enriched });
  } catch (err) {
    //console.error("Error fetching base assets:", err);
    res.status(500).json({ message: err.message });
  }
};
