const Sequelize = require('sequelize');

const sequelize = new Sequelize('kaue', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
	console.log("Conexão realizada com sucesso!");
}).catch(() => {
	console.log("Erro ao conectar-se com o banco");
});

module.exports = sequelize;