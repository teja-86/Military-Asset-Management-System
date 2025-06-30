export default (sequelize, DataTypes) => {
  const Personnel = sequelize.define('Personnel', {
    personnel_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    base_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    created_at:{
       type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: 'personnel',
    timestamps: false,
   
    
  });

  return Personnel;
};
