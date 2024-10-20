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
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favoriteColor: DataTypes.STRING,
  age: DataTypes.INTEGER,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

// Sicronizar el todos los modelos con la base de datos
/** TIP:
 * sync({ force: true }) y sync({ alter: true })
 * Son operaciones destructivas, en producción se recomienda realizar la sincronización con el concepto de migraciones
*/
await sequelize.sync({ force: true })
console.log('The table for the User model was just created')

// INSERT simple
const jane = await User.create({ name: 'Jane' })

/** TIP:
 * Es posible definir que atributos se pueden establecer en 'create'
 * Es útil para crear entradas basadas en formularios del usuario
*/
const david = await User.create(
  {
    name: 'David',
    isAdmin: true
  },
  { fields: ['name'] }
)

// SELECT simple
const users = await User.findAll()
// console.log('All users: ', JSON.stringify(users, null, 2))

// SELECT con WHERE
const infoDavid = david.toJSON()
const data = await User.findAll({
  where: { id: infoDavid.id }
})
// console.log(JSON.stringify(data, null, 2))

// UPDATE
await User.update(
  { name: 'Otro nombre' },
  {
    where: { name: 'Jane' }
  }
)

// DELETE
await User.destroy({
  where: {
    id: infoDavid.id
  }
})

// bulkCreate (No ejecuta las validaciones en cada objeto, que si hace 'create', se debe pasar 'validate: true')
const groupOne = await User.bulkCreate([
  { name: 'Mario' },
  { name: 'Liz' },
  { name: 'Pedro' }
], {
  validate: true,
  fields: ['id', 'name']
})
