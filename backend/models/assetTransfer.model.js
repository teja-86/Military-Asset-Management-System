export default (sequelize, DataTypes) => {
  const AssetTransfer = sequelize.define('AssetTransfer', {
    transfer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    asset_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    from_base_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    to_base_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transfer_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    tableName: 'asset_transfers',
    timestamps: false
  });

  return AssetTransfer;
};
