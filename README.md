### ¿Por qué las asociaciones se definen en pares?
*Documentación de Sequelize:*  https://sequelize.org/docs/v6/core-concepts/assocs/#why-associations-are-defined-in-pairs

Cuando se define una asociación entre dos modelos, solo el modelo fuente lo sabe. Por ejemplo, cuando se usa `Foo.hasOne(Bar)` solo **Foo** conoce la existencia de la asociación. Por lo que las instancias de **Foo** obtienen los métodos `getBar()`, `setBar()` y `createBar()`, mientras que las instancias de **Bar** no obtienen nada.

Entonces para `Foo.hasOne(Bar)`, se podría realizar **eager loading**: 
* `Foo.findOne({ include: Bar })`

Pero no se podría hacer desde **Bar**: 
* `Bar.findOne({ include: Foo })`

Por lo tanto, generalmente se configura la relación en pares, de modo que ambos modelos conozcan la existencia de la asociación.

#### Múltiples asociaciones que involucran los mismos modelos

Para definir múltiples asociaciones entre los mismos modelos, se debe definir diferentes alias para ellos:
```
Team.hasOne(Game, { as: 'HomeTeam', foreignKey: 'homeTeamId' });
Team.hasOne(Game, { as: 'AwayTeam', foreignKey: 'awayTeamId' });
Game.belongsTo(Team);
```