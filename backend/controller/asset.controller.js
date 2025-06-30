import db from '../config/database.js';
const Asset = db.Asset;

export const createAsset = async (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Name and category are required.' });
  }

  try {
    const existing = await Asset.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Asset name already exists.' });
    }

    const asset = await Asset.create({ name, category });
    return res.status(201).json({ success: true, message: 'Asset created successfully.', asset });
  } catch (error) {
    return res.status(500).json({ success: false, message:  error.message });
  }
};

// Get all assets
export const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    return res.status(200).json({ success: true, assets });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get assets by category
export const getAssetsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const assets = await Asset.findAll({ where: { category } });
    return res.status(200).json({ success: true, assets });
  } catch (error) {
    return res.status(500).json({ success: false, message:  error.message });
  }
};

// Update asset by name (Admin only)
export const updateAsset = async (req, res) => {
  const { name } = req.params;
  const { newName, category } = req.body;

  try {
    const asset = await Asset.findOne({ where: { name } });
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found.' });
    }

    if (newName && newName !== name) {
      const existing = await Asset.findOne({ where: { name: newName } });
      if (existing) {
        return res.status(409).json({ success: false, message: 'New asset name already exists.' });
      }
    }

    if (newName) asset.name = newName;
    if (category) asset.category = category;

    await asset.save();
    return res.status(200).json({ success: true, message: 'Asset updated successfully.', asset });
  } catch (error) {
    return res.status(500).json({ success: false, message:  error.message });
  }
};

// Delete asset by name (Admin only)
export const deleteAsset = async (req, res) => {
  const { name } = req.params;

  try {
    const asset = await Asset.findOne({ where: { name } });
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found.' });
    }

    await asset.destroy();
    return res.status(200).json({ success: true, message: 'Asset deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message});
  }
};
