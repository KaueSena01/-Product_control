const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('usuarios', {
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nome:{
		type: Sequelize.STRING,
		allowNull: false
	},
	email:{
		type: Sequelize.STRING,
		allowNull: false
	},
	senha:{
		type: Sequelize.STRING
	}});

User.sync();

module.exports = User;