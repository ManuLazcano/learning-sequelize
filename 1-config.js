import { Sequelize } from 'sequelize'

// Conección a una base de datos
export const sequelize = new Sequelize({
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
