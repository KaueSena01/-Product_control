const jwt = require('jsonwebtoken');
const {promisify} = require('util');
require('dotenv').config(); 

module.exports = {
	eAdmin: async function (req, res, next){
		const authHeader = req.headers.authorization;

		if(!authHeader){
			return res.status(400).json({
				erro: true,
				mensagem: "Erro: Para acessar essa página é necessário realizar o login!"
			})
		}

		const [, token] = authHeader.split(' ');

		if(!token){
			return res.status(400).json({
				erro: true,
				mensagem: "Erro: Para acessar essa página é necessário realizar o login!"
			})
		}

		try{
			const decode = await promisify(jwt.verify)(token, 
			process.env.SECRET);
			req.userId = decode.id;
			return next();
		}catch(err){
			return res.status(400).json({
				erro: true,
				mensagem: "Erro: Para acessar essa página é necessário realizar o login!"
				// Token inválido
			})
		}

	}
}