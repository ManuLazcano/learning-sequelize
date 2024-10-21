import { DataTypes } from 'sequelize'
import { sequelize } from './1-config.js'

const Movie = sequelize.define('Movie', { name: DataTypes.STRING })
const Actor = sequelize.define('Actor', { name: DataTypes.STRING })

// ----- ----- Many-To-Many ----- -----
Movie.belongsToMany(Actor, { through: 'ActorMovies' })
Actor.belongsToMany(Movie, { through: 'ActorMovies' })

// También se puede pasar un modelo ya creado para usarlo como modelo de unión
const ActorMovies = sequelize.define('ActorMoives', {
  MovieId: {
    type: DataTypes.INTEGER, // DataTypes.UUID si es necesario
    references: {
      model: Movie,
      key: 'id'
    }
  },
  ActorId: {
    type: DataTypes.INTEGER, // DataTypes.UUID
    references: {
      model: Actor,
      key: 'id'
    }
  }
})

Movie.belongsToMany(Actor, { through: ActorMovies })
Actor.belongsToMany(Movie, { through: ActorMovies })
