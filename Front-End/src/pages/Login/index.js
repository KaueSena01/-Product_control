import React, {useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import {Container, ConteudoTitulo, Titulo, AlertDanger} from '../../styles/custom_adm';

import api from '../../config/configApi';

import {Context} from '../../Context/AuthContext';

export const Login = () => {

	const [user, setUser] = useState({
		email: '',
		senha: '',
	})

	const [status, setStatus] = useState({
		type: '',
		mensagem: '',
		loading: false
	})

	const valorInput = e => setUser({...user, [e.target.name]: e.target.value});

	const loginSubmit = async e => {
		e.preventDefault();

		setStatus({loading: true})

		const headers = {
			'headers': {
			'Content-Type': 'application/json'
			}
		}

		await api.post("/login", user, headers)
		.then((response) => {
			console.log(response)
			localStorage.setItem('token', response.data.token);
			setStatus({type: 'redSuccess', loading: false})
			
		}).catch((err) => {
			if(err.response){
				setStatus({
		        type: 'error',
				mensagem: err.response.data.mensagem,
				loading: false
			})
			}else{
				setStatus({
		        	type: 'error',
					mensagem: "Erro: tente novamente mais tarde!",
					loading: false
			 	})
			}
		})
	}
	return(
		<>
		
			<Container>
			<ConteudoTitulo>
			<Titulo>Login</Titulo>
			</ConteudoTitulo>

			{status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
			{status.type === 'redSuccess' ? <Redirect to={{
				pathname: "/dashboard"
			}}/> : ""}

			<form onSubmit={loginSubmit}>
				<label>E-mail:</label>
				<input type="text" name="email" placeholder="Digite seu e-mail" 
				onChange={valorInput}/>
				<br/><br/>
				<label>Senha:</label>
				<input type="password" name="senha" placeholder="Digite a senha" autocomplete="on"
				onChange={valorInput}/>
				<br/><br/>
				{status.loading ? <button type="submit" disabled>Acessando</button> : <button type="submit">Acessar</button>}
				
			</form>
			</Container>
		</>
	);
}