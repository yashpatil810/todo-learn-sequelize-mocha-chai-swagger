'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    body: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    indexes: [
      {type: 'FULLTEXT', name: 'text_idx', fields:['name', 'body']}
    ]
  });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};