export default (sequelize, DataTypes) => {
   const Base = sequelize.define('Base', {
    base_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    base_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'bases',
    timestamps:false,
     
    underscored: true,
  });
  return Base;
};