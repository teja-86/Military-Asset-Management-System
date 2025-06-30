export default (sequelize, DataTypes) => {
  const AssetExpenditure = sequelize.define('AssetExpenditure', {
    expenditure_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    personnel_id: {
      type: DataTypes.UUID,
      allowNull: false
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
    status: {
      type: DataTypes.ENUM('RETURNED', 'EXPENDED'),
      allowNull: false
    },
    expended_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'asset_expenditures',
    timestamps: false
  });

  return AssetExpenditure;
};
