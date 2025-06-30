export default (sequelize, DataTypes) => {
  const AssetAssignment = sequelize.define('AssetAssignment', {
    assignment_id: {
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
    assigned_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'asset_assignments',
    timestamps: false
  });

  return AssetAssignment;
};
