import { Sequelize } from 'sequelize';


// Remplace avec tes identifiants de base de données
const sequelize = new Sequelize('db_tresorie', 'db_user', 'db_user_pass', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: console.log // Activé pour debug
});
const initDb = () => {
  // force: false = ne pas supprimer/recréer les tables
  // alter: false = ne pas modifier le schéma (par défaut)
  return sequelize.sync({ force: false }).then(() => {
    console.log('La base de données a été synchronisée.');
  });
};
export { sequelize, initDb };