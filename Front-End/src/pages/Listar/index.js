import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
// Recebendo a mensagem do cadastrar -> useLocation

import {Menu} from '../../components/Menu';
import {AlertSuccess, Container, ConteudoTitulo, Titulo, Button, Table, ButtonPrimary, ButtonWarning, ButtonDanger, AlertDanger} from '../../styles/custom_adm';

import api from '../../config/configApi';
export const Listar = () => {

	const { state } = useLocation();

	const [status, setStatus] = useState({
		type: state ? state.type : "",
		mensagem: state ? state.mensagem : ""
	}); 

	const [data, setData] = useState([]);

	const headers = {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		}
	}

	const listarProdutos = async () => {
		await api.get('/list-produto', headers)
		.then((response) => {
			setData(response.data.produtos)
		}).catch((err) => {
			if(err.response){
				setStatus({
					type: "error",
					mensagem: err.response.data.mensagem
				})
			}else{
				setStatus({
					type: "error",
					mensagem: "Erro: tente novamente mais tarde"
				})
			}
		})
	}

	useEffect(() => {
		listarProdutos();
	}, []);

	const apagarProduto = async (idProduto) => {
		await api.delete("/delete-produto/" + idProduto)
		.then((response) => {
			setStatus({
				type: "success",
				mensagem: response.data.mensagem
			});
			listarProdutos();
		}).catch((err) => {
			if (err.response){
				setStatus({
					type: "error",
					mensagem: err.response.data.mensagem
				})
			}else{
				setStatus({
					type: "error",
					mensagem: "Erro: tente novamente mais tarde!"
				})
			}
		})
	}
	return(
		<>
			<Menu />
			<Container>
			<ConteudoTitulo>
			<Titulo>Listar</Titulo>
			<Link to="/cadastrar"><Button type="button">Cadastrar +</Button></Link>
			</ConteudoTitulo>
			{status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
			{status.type === "success" ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

			
			<hr/>
			<Table>
				<thead>
					<tr>
					  <th>ID</th>
					  <th>Nome</th>
					  <th>Preço</th>
					  <th>Quantidade</th>
					  <th>Ações</th>
					</tr>
				</thead>
				<tbody>
				{data.map(produto => (
					<tr key={produto.id}>
					  <td>{produto.id}</td>
					  <td>{produto.nome}</td>
					  <td>{new Intl.NumberFormat("pt-br", {style: 'currency', currency: 'BRL'}).format(produto.preco_venda)}</td>
					  <td>{produto.quantidade}</td>
					  <td>
					  <Link to={"/visualizar/" + produto.id}>
					  <ButtonPrimary type="button">Visualizar</ButtonPrimary></Link>
					  
					  <Link to={"/editar/" + produto.id}>
					  <ButtonWarning type="button">Editar</ButtonWarning></Link> 

					  <Link to={"#"}>
					  <ButtonDanger type="button" 
					  onClick={() => apagarProduto(produto.id)}>Apagar</ButtonDanger></Link>
					  </td>
					</tr>
				))}
					
				</tbody>
			</Table>
			</Container>
		</>
	);
}