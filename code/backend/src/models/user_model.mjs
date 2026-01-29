import { sequelize } from '../db/sequelize.mjs';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  youth_club_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false, // Ton schéma ne montre pas de colonnes created_at/updated_at
  tableName: 'users'
});

export { User };