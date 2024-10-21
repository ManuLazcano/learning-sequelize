import { DataTypes } from 'sequelize'
import { sequelize } from './1-config.js'

const Team = sequelize.define('Team', { name: DataTypes.STRING })
const Player = sequelize.define('Player', { name: DataTypes.STRING })

// ----- ----- One-To-Many ----- -----
Team.hasMany(Player)
Player.belongsTo(Team)

// Las operaciones son las mimas que se usaron para el caso de One-To-One. Ejemplo:
Team.hasMany(Player)
Player.belongsTo(Team, {
  foreignKey: {
    name: 'team_id',
    type: DataTypes.UUID,
    allowNull: false
  }
})
