const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

const Produto = require('./models/Produto');
const User = require('./models/Usuario');

const {eAdmin} = require('./middlewares/auth');

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
  app.use(cors());
  next();
})

// Produto

app.get('/list-produto', eAdmin, async (req, res) => {
	await Produto.findAll({
		attributes: ['id', 'nome', 'preco_venda', 'quantidade'],
		order:[
			['id', 'DESC']
		]
	})
	.then((produtos) => {
		return res.json({
			erro: false,
			produtos: produtos,
			// idUsuario: req.userId
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Nenhum produto encontrado!"	
		});
	});
});

app.get('/view-produto/:id', eAdmin, async (req, res) => {
	const {id} = req.params
	await Produto.findByPk(id)
	.then((produto) => {
		return res.json({
			erro: false,
			produto: produto
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Nenhum produto encontrado!"	
		});
	});
});

app.put('/edit-produto', eAdmin, async (req, res) => {
	const {id} = req.body;
	await Produto.update(req.body, {where: {id}})
	.then(() => {
		return res.json({
			erro: false,
			mensagem: "Produto editado com sucesso!"
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Produto não editado!"	
		})
	})
});

app.post('/cad', eAdmin, async (req, res) => {
	await Produto.create(req.body)
	.then(() => {
		return res.json({
			erro: false,
			mensagem: "Produto cadastrado com sucesso!"
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Produto não cadastrado com sucesso!"	
		})
	});
});

// Coluna id= id
app.delete('/delete-produto/:id', async (req, res) => {
	const {id} = req.params;
	await Produto.destroy({where: {id: id}})
	.then(() => {
		return res.json({
			erro: false,
			mensagem: "Produto deletado com sucesso!"
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Produto não deletado!"	
		})
	});
});

// Usuário

// Listar
app.get('/usuario-list', eAdmin, async (req, res) => {
	await User.findAll({
		attributes: ['id', 'nome', 'email'],
		order:[
			['id', 'DESC']
		]
	})
	.then((usuarios) => {
		return res.json({
			erro: false,
			usuarios: usuarios
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Nenhum usuário encontrado!"	
		});
	});
});

// Cadastrar
app.post('/usuario-cad', eAdmin, async (req, res) => {
	var dados = req.body;
	dados.senha = await bcrypt.hash(dados.senha, 8);

	await User.create(dados)
	.then(() => {
		return res.json({
			erro: false,
			mensagem: "Usuário cadastrado com sucesso!"
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Usuário não cadastrado!"	
		})
	});
});

// Visualizar
app.get('/usuario-view/:id', eAdmin, async (req, res) => {
	const {id} = req.params
	await User.findByPk(id)
	.then((usuario) => {
		return res.json({
			erro: false,
			usuario: usuario
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Nenhum usuário encontrado!"	
		});
	});
});

// Editar
app.put('/usuario-edit', eAdmin, async (req, res) => {
	const {id} = req.body;

	var dados = req.body;
	dados.senha = await bcrypt.hash(dados.senha, 8);

	await User.update(dados, {where: {id}})
	.then(() => {
		return res.json({
			erro: false,
			mensagem: "Usuário editado com sucesso!"
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Erro ao editar os dados! "
		})
	})
});

// Deletar
app.delete('/usuario-delete/:id', eAdmin, async (req, res) => {
	const {id} = req.params;
	await User.destroy({where: {id: id}})
	.then(() => {
		return res.json({
			erro: false,
			mensagem: "Usuário deletado com sucesso!"
		})
	}).catch(() => {
		return res.status(400).json({
			erro: true,
			mensagem: "Erro ao deletar o usuário!"	
		})
	});
});

app.post('/login', async (req, res) => {
		const user = await User.findOne({
			attributes: ['id', 'nome', 'email', 'senha'],
			where: {
				email: req.body.email
			}
		});

		if(user === null){
			return res.status(400).json({
				erro: true,
				mensagem: "Erro: Informações incorretas!"
			})
		}

		if(!(await bcrypt.compare(req.body.senha, user.senha))){
			return res.status(400).json({
				erro: true,
				mensagem: "Erro: Informações incorretas!"
		  })
		}

		var token = jwt.sign({id: user.id}, 
		process.env.SECRET, {
			expiresIn: '1d'
		})

		return res.status(200).json({
				erro: false,
				mensagem: "Email encontrado",
				token: token
		})
});



app.listen(8080);