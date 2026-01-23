import { sequelize } from '../db/sequelize.mjs';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  youth_club_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'youth_clubs',
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'users',
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

export { User };