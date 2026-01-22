import { Sequelize } from 'sequelize';


// Remplace avec tes identifiants de base de données
const sequelize = new Sequelize('db_tresorie', 'db_user', 'db_user_pass', {
  host: 'db',
  dialect: 'mysql',
  logging: false
});
const initDb = () => {
    return sequelize.sync().then(() => {
        console.log('La base de données a été synchronisée.');
    });
};
export { sequelize, initDb };