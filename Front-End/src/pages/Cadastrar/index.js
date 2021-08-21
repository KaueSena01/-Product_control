import React, { useState } from 'react';
import {Redirect, Link} from 'react-router-dom';

import {Menu} from '../../components/Menu';
import {AlertSuccess, AlertDanger, Container, ConteudoTitulo, Titulo, Button, ButtonPrimary, FormStyle, Label, Input} from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Cadastrar = () => {

	const [produto, setProduto] = useState({
		nome: '',
		preco_compra: '',
		preco_venda: '',
		quantidade: ''
	});

	const [status, setStatus] = useState({
		type: '',
		mensagem: ''
	}) 

	const valueInput = e => setProduto({ ...produto, [e.target.name]: e.target.value});

	const valuePrecoCompra = async e => {
		var valorPrecoCompraInput = e.target.value;

		valorPrecoCompraInput = valorPrecoCompraInput.replace(/\D/g, "");
		valorPrecoCompraInput = valorPrecoCompraInput.replace(/(\d)(\d{2})$/, "$1,$2");
		valorPrecoCompraInput = valorPrecoCompraInput.replace(/(?=(\d{3})+(\D))\B/g, ".");

		setValorPrecoCompraTarget(valorPrecoCompraInput);

		var precoCompra = await valorPrecoCompraInput.replace(".", "");
		precoCompra = await precoCompra.replace(",", ".");

		setProduto({...produto, preco_compra: precoCompra});
	}

	const [valorPrecoCompraTarget, setValorPrecoCompraTarget] = useState();
 
	const valuePrecoVenda = async e => {
		var valorPrecoVendaInput = e.target.value;

		valorPrecoVendaInput = valorPrecoVendaInput.replace(/\D/g, "");
		valorPrecoVendaInput = valorPrecoVendaInput.replace(/(\d)(\d{2})$/, "$1,$2");
		valorPrecoVendaInput = valorPrecoVendaInput.replace(/(?=(\d{3})+(\D))\B/g, ".");

		setValorPrecoVendaTarget(valorPrecoVendaInput);

		var precoVenda = await valorPrecoVendaInput.replace(".", "");
		precoVenda = await precoVenda.replace(",", ".");

		setProduto({...produto, preco_venda: precoVenda});
	}

	const [valorPrecoVendaTarget, setValorPrecoVendaTarget] = useState();
		

	const addProduto = async e => {
		e.preventDefault();

		const headers = {
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
		}
	}
		await api.post("/cad", produto, headers)
		.then((response) => {
			setStatus({
		       type: 'redSuccess',
				mensagem: response.data.mensagem
			})
		}).catch((err) => {
			if(err.response){
			setStatus({
		        type: 'error',
				mensagem: err.response.data.mensagem
			})
			}else{
			setStatus({
		        type: 'error',
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
			<Titulo>Visualizar dados</Titulo>
			<Link to="/listar"><Button type="button">Listar</Button></Link>
			</ConteudoTitulo>

			{status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
			{/*{status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}*/}
			{status.type === 'redSuccess' ? <Redirect to={{
				pathname: "/listar",
    			state: { type: "success", mensagem: status.mensagem }

			}}/> : ""}

			<hr/>
			<FormStyle onSubmit={addProduto}>
				<Label>Nome: </Label>
				<Input type="text" name="nome" placeholder="Nome do produto"
				onChange={valueInput} />

				<Label>Preço de compra: </Label>
				<Input type="text" name="valorPrecoCompraTarget" value={valorPrecoCompraTarget} placeholder="Preço do produto"
				onChange={valuePrecoCompra} />

				<Label>Preço de venda: </Label>
				<Input type="text" name="valorPrecoVendaTarget" value={valorPrecoVendaTarget} placeholder="Preço do produto"
				onChange={valuePrecoVenda} />

				<Label>Quantidade: </Label>
				<Input type="number" name="quantidade" placeholder="Quantidade do produto"
				onChange={valueInput} />

				<ButtonPrimary type="submit" style={{marginLeft: 0, padding: 10}}>Cadastrar</ButtonPrimary>
			</FormStyle>
			</Container>
		</>
	);
}