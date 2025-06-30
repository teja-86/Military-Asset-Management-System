export default (sequelize, DataTypes) => {
  const Asset= sequelize.define('Asset', {
    asset_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,  
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'assets',
    timestamps: false,
    underscored: true
  });
  return Asset;
};
