// backend/config/database.js

import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import RoleModel from '../models/role.model.js';
import UserModel from '../models/user.model.js';
import BaseModel from '../models/base.model.js';
import AssetModel from "../models/asset.model.js";
import BaseAssetModel from '../models/baseAsset.model.js';
import PurchaseModel from '../models/purchase.model.js';
import AssetTransferModel from '../models/assetTransfer.model.js';
import PersonnelModel from '../models/personnel.model.js';
import AssetAssignmentModel from '../models/assetAssignment.model.js';
import AssetExpenditureModel from '../models/assetExpenditure.model.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Important for Render PostgreSQL
      },
    },
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',  
      underscored: true,       
    },
  }
);

// Initialize DB object
const db = {};

// Sequelize core references
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Role = RoleModel(sequelize, DataTypes);
db.User = UserModel(sequelize, DataTypes);
db.Base = BaseModel(sequelize, DataTypes);
db.Asset = AssetModel(sequelize , DataTypes);
db.BaseAsset = BaseAssetModel(sequelize, DataTypes);
db.Purchase = PurchaseModel(sequelize, DataTypes);
db.AssetTransfer = AssetTransferModel(sequelize, DataTypes);
db.Personnel = PersonnelModel(sequelize, DataTypes);
db.AssetAssignment = AssetAssignmentModel(sequelize, DataTypes);
db.AssetExpenditure = AssetExpenditureModel(sequelize, DataTypes);


db.User.belongsTo(db.Role, { foreignKey: 'role_id', as: 'role' });
db.Role.hasMany(db.User, { foreignKey: 'role_id', as: 'users' });
db.User.belongsTo(db.Base, { foreignKey: 'base_id', as: 'assignedBase' });
db.Base.hasMany(db.User, { foreignKey: 'base_id', as: 'users' });
db.Purchase.belongsTo(db.User, {foreignKey: 'created_by',as: 'creator', // alias must match the `include` in controller
});

db.BaseAsset.belongsTo(db.Base, { foreignKey: 'base_id' });
db.Base.hasMany(db.BaseAsset, { foreignKey: 'base_id' });
db.BaseAsset.belongsTo(db.Asset, { foreignKey: 'asset_id' });
db.Asset.hasMany(db.BaseAsset, { foreignKey: 'asset_id' });

db.Purchase.belongsTo(db.Base, { foreignKey: 'base_id' });
db.Base.hasMany(db.Purchase, { foreignKey: 'base_id' });
db.Purchase.belongsTo(db.Asset, { foreignKey: 'asset_id' });
db.Asset.hasMany(db.Purchase, { foreignKey: 'asset_id' });

db.AssetTransfer.belongsTo(db.Base, { foreignKey: 'from_base_id', as: 'from_base' });
db.AssetTransfer.belongsTo(db.Base, { foreignKey: 'to_base_id', as: 'to_base' });
db.AssetTransfer.belongsTo(db.Asset, { foreignKey: 'asset_id', as:"asset" });
db.AssetTransfer.belongsTo(db.User, { foreignKey: 'created_by', as:'creator' });

db.AssetAssignment.belongsTo(db.Personnel, { foreignKey: 'personnel_id' });
db.AssetAssignment.belongsTo(db.Base, { foreignKey: 'base_id' });
db.AssetAssignment.belongsTo(db.Asset, { foreignKey: 'asset_id' });

db.AssetExpenditure.belongsTo(db.Personnel, { foreignKey: 'personnel_id' });
db.AssetExpenditure.belongsTo(db.Base, { foreignKey: 'base_id' });
db.AssetExpenditure.belongsTo(db.Asset, { foreignKey: 'asset_id' });

db.Personnel.belongsTo(db.Base ,{foreignKey:'base_id' , as:'base'});
db.Base.hasMany(db.Personnel ,{foreignKey:'base_id' , as:'base'});

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully');
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });

export default db;
