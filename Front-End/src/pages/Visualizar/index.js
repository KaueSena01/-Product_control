import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom'

import {Menu} from '../../components/Menu';
import {Container, ConteudoTitulo, Titulo, Button, ButtonWarning, GroupButton, ConteudoView} from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Visualizar = (props) => {

	const [id] = useState(props.match.params.id);
	console.log(id);
	const [data, setData] = useState("");

	const [status, setStatus] = useState({
		type: "",
		mensagem: ""
	});

	useEffect(() => {
		const getProduto = async () => {
			const headers = {
			'headers': {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}
			await api.get("/view-produto/" + id, headers)
			.then((response) => {
				setData(response.data.produto);
			}).catch((err) => {
				if(err.response){
					setStatus({
						type: "redError",
						mensagem: err.response.data.mensagem
					})
				}else{
					setStatus({
						type: "redError",
						mensagem: "Erro: tente novamente mais tarde"
					})
				}
			});
		}
		getProduto();
	}, [id])

	return(
		<>
			<Menu/>
			<Container>
			<ConteudoTitulo>
			<Titulo>Visualizar dados</Titulo>
			<GroupButton>
			<Link to="/listar"><Button type="button">Listar</Button></Link>
			<Link to={"/editar/" + data.id}><ButtonWarning type="button">Editar</ButtonWarning></Link>
			</GroupButton>
			</ConteudoTitulo>

			{status.type === 'redErro' ? <Redirect to={{
				pathname: "/listar",
    			state: { type: "error", mensagem: status.mensagem }

			}}/> : ""}

			<hr/>
			<ConteudoView>ID: {data.id}</ConteudoView>
			<ConteudoView>Produto: {data.nome}</ConteudoView>
			<ConteudoView>Preço de compra: {new Intl.NumberFormat("pt-br", {style: 'currency', currency: 'BRL'}).format(data.preco_compra)}</ConteudoView>
			<ConteudoView>Preço de venda: {new Intl.NumberFormat("pt-br", {style: 'currency', currency: 'BRL'}).format(data.preco_venda)}</ConteudoView>
			<ConteudoView>Quantidade: {data.quantidade}</ConteudoView>
			</Container>
		</>
	);
}