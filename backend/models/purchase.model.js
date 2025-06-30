export default (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    purchase_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    base_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    asset_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    purchase_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    tableName: 'purchases',
    timestamps: false
  });

  return Purchase;
};
