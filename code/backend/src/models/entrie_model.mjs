import { sequelize } from '../db/sequelize.mjs';
import { DataTypes } from 'sequelize';

const Entry = sequelize.define('Entry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false
  },
  entry_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'entries',
  timestamps: false // À retirer si tu veux createdAt/updatedAt
});

export { Entry };