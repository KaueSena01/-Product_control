import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';

import {Menu} from '../../components/Menu';

import {Container, ConteudoTitulo, Titulo, AlertDanger, AlertSuccess, Button, FormStyle, Label, Input, ButtonPrimary, GroupButton} from '../../styles/custom_adm';

import api from '../../config/configApi';

export const Editar = (props) => {

	const [id] = useState(props.match.params.id);
	const [nome, setNome] = useState("");
	const [preco_compra, setPrecoCompra] = useState("");
	const [preco_venda, setPrecoVenda] = useState("");
	const [quantidade, setQuantidade] = useState("");

	const [valorPrecoCompraTarget, setValorPrecoCompraTarget] = useState();
	const [valorPrecoVendaTarget, setValorPrecoVendaTarget] = useState();

	const valuePrecoCompra = async (valorPrecoCompraInput) => {
	
		var valorPrecoCompraConvert = valorPrecoCompraInput.toString().replace(/\D/g, "");
		valorPrecoCompraConvert = valorPrecoCompraInput.replace(/(\d)(\d{2})$/, "$1,$2");
		valorPrecoCompraConvert = valorPrecoCompraInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
		
		setValorPrecoCompraTarget(valorPrecoCompraConvert);

		var precoCompra = await valorPrecoCompraInput.replace(".", "");
		precoCompra = await precoCompra.replace(",", ".");

		setPrecoCompra(precoCompra);
	}

	const valuePrecoVenda = async (valorPrecoVendaInput) => {
	
		var valuePrecoVendaConvert = valorPrecoVendaInput.toString().replace(/\D/g, "");
		valuePrecoVendaConvert = valorPrecoVendaInput.replace(/(\d)(\d{2})$/, "$1,$2");
		valuePrecoVendaConvert = valorPrecoVendaInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
		
		setValorPrecoVendaTarget(valuePrecoVendaConvert);

		var precoVenda = await valorPrecoVendaInput.replace(".", "");
		precoVenda = await precoVenda.replace(",", ".");

		setPrecoVenda(precoVenda);
	}

	const [status, setStatus] = useState({
		type: "",
		mensagem: ""
	});

	const editProduto = async e => {
		e.preventDefault();
		const headers = {
			'headers': {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}

		await api.put("/edit-produto", {id, nome, preco_compra, preco_venda, quantidade}, headers)
		.then((response) => {
			setStatus({
				type: "redSuccess",
				mensagem: response.data.mensagem
			})
		}).catch(err => {
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
		const getProduto = async () => {

			const headers = {
			'headers': {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}

			await api.get("/view-produto/" + id, headers)
			.then((response) => {
				setNome(response.data.produto.nome);
				setPrecoCompra(response.data.produto.preco_compra);
				setValorPrecoCompraTarget(new Intl.NumberFormat('pt-br', {minimumFractionDigits: 2,
					currency: 'BRL'}).format(response.data.produto.preco_compra));

				setPrecoVenda(response.data.produto.preco_venda);
				setValorPrecoVendaTarget(new Intl.NumberFormat('pt-br', {minimumFractionDigits: 2,
					currency: 'BRL'}).format(response.data.produto.preco_venda))

				setQuantidade(response.data.produto.quantidade);

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
	}, [id]);

	return(
		<>
			<Menu />
			<Container>
			
			<ConteudoTitulo>
			<Titulo>Editar</Titulo>
			<GroupButton>
			<Link to="/listar"><Button type="button">Listar</Button></Link>
			<Link to={"/visualizar/" + id}><ButtonPrimary type="button">Visualizar</ButtonPrimary></Link>
			</GroupButton>
			</ConteudoTitulo>
			{status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
			{status.type === 'redSuccess' ? <Redirect to={{
				pathname: "/listar",
    			state: { type: "success", mensagem: status.mensagem }

			}}/> : ""}

			<hr/>
			<FormStyle onSubmit={editProduto}>
				<Label>Nome: </Label>
				<Input type="text" name="nome" placeholder="Nome do produto"
				value={nome} onChange={e => setNome(e.target.value)}/>

				<Label>Preço de compra: </Label>
				<Input type="text" name="valorPrecoCompraTarget" placeholder="Preço do produto"
				value={valorPrecoCompraTarget} onChange={e => valuePrecoCompra(e.target.value)}/>

				<Label>Preço de venda: </Label>
				<Input type="text" name="valorPrecoVendaTarget" placeholder="Preço do produto"
				value={valorPrecoVendaTarget} onChange={e => valuePrecoVenda(e.target.value)}/>

				<Label>Quantidade: </Label>
				<Input type="number" name="quantidade" placeholder="Quantidade do produto"
				value={quantidade} onChange={e => setQuantidade(e.target.value)}/> 

				<ButtonPrimary type="submit" style={{marginLeft: 0, padding: 10}}>Salvar</ButtonPrimary>
			</FormStyle>
			</Container>
		</>
	);
}