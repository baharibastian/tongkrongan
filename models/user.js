'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    email: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    password: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
  });
  
  return User;
};