import { Sequelize, DataTypes } from 'sequelize'

// Conección a una base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
})

// Probar la conección
try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

// Definición de un modelo
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

// Sicronizar el todos los modelos con la base de datos
sequelize.sync()
  .then(() => console.log('The table for the User model was just created'))
  .catch((error) => console.log('Error synchronizing database: ', error))

/** TIP:
 * sync({ force: true }) y sync({ alter: true })
 * Son operaciones destructivas, en producción se recomienda realizar la sincronización con el concepto de migraciones
*/
