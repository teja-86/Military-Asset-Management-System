

export default (sequelize , DataTypes)=>{
    const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
    underscored: true
  });
  return Role;
};