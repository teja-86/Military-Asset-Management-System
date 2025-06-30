export default (sequelize, DataTypes) => {
  const BaseAsset = sequelize.define('BaseAsset', {
    base_asset_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    base_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bases',
        key: 'base_id'
      }
    },
    asset_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'assets',
        key: 'asset_id'
      }
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    assigned_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    expended_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    available_quantity: {
      type: DataTypes.VIRTUAL,
      get() {
        const total = this.getDataValue('total_quantity') || 0;
        const assigned = this.getDataValue('assigned_quantity') || 0;
        const expended = this.getDataValue('expended_quantity') || 0;
        return total - assigned - expended;
      }
    }
  }, {
    tableName: 'base_assets',
    timestamps: false
  });

  return BaseAsset;
};
