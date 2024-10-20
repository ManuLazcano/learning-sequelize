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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favoriteColor: DataTypes.STRING,
  age: DataTypes.INTEGER
})

// Sicronizar el todos los modelos con la base de datos
/** TIP:
 * sync({ force: true }) y sync({ alter: true })
 * Son operaciones destructivas, en producción se recomienda realizar la sincronización con el concepto de migraciones
*/
await sequelize.sync({ force: true })
console.log('The table for the User model was just created')

// Crear una instancia
const jane = await User.create({ name: 'Jane' })
console.log('Jane was saved to yhe database')

console.log(jane.toJSON())

// Actualizar una instancia
await jane.update({ age: 25, favoriteColor: 'red' })
console.log('Age and favoriteColor updated')
console.log(jane.toJSON())

// Eliminar una instancia
// await jane.destroy()
