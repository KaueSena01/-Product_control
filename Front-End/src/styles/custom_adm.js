import styled from 'styled-components';

export const Container = styled.section`
	margin: 0px auto;
	width: 960px;
	max-width: 960px;
`;
export const ConteudoTitulo = styled.section`
	display: flex;
	justify-content: space-between;
`;
export const Titulo = styled.h1`
	font-size: 23px;
	font-family: sans-serif;
	margin: 10px 0;
	color: #1d1e1e; 
`;
// Listar
export const Button = styled.button`
	margin: 5px;
	padding: 6px 8px;
	color: #198754;
	background-color: #fff;
	border: 1px solid #198754;
	border-radius: 3px;
	cursor: pointer;
	font-size: 14px;
	transition: all ease .2s;
	:hover{
		background-color: #198754;
		color: #fff;
	}
`;
// Button group
export const GroupButton = styled.section`
	display: flex;
	max-width: 300px;
`;
export const ButtonPrimary = styled.button`
	margin: 5px;
	padding: 6px 8px;
	color: #0d6efd;
	background-color: #fff;
	border: 1px solid #0d6efd;
	border-radius: 3px;
	cursor: pointer;
	font-size: 14px;
	transition: all ease .2s;
	:hover{
		background-color: #0d6efd;
		color: #fff;
	}
`;
export const ButtonWarning = styled.button`
	margin: 5px;
	padding: 6px 8px;
	color: #ffc107;
	background-color: #fff;
	border: 1px solid #ffc107;
	border-radius: 3px;
	cursor: pointer;
	font-size: 14px;
	transition: all ease .2s;
	:hover{
		background-color: #ffc107;
		color: #fff;
	}
`;
export const ButtonDanger = styled.button`
	margin: 5px;
	padding: 6px 8px;
	color: crimson;
	background-color: #fff;
	border: 1px solid crimson;
	border-radius: 3px;
	cursor: pointer;
	font-size: 14px;
	transition: all ease .2s;
	:hover{
		background-color: crimson;
		color: #fff;
	}
`;
export const Table = styled.table`
	margin-top: 15px;
	width: 100%;
	th{
		background-color: #007281;
		color: #f1f1f1;
		padding: 10px;
	}
	td{
		background-color: #f6f6f6;
		color: #3e3e3e;
		padding: 8px;
	}
`;
export const ConteudoView = styled.p`
	margin-top: 15px
	font-size: 18px;
	font-tamily: sans-serif;
`;

// Form
export const FormStyle = styled.form`
	padding-top: 25px;
	width: 60%;
	margin: 0 auto;
`;
export const Label = styled.label`
	font-size: 18px;
	width: 100%;
	padding: 12px 0;
`;
export const Input = styled.input`
	width: 100%;
	border: 2px solid #438fff;
	border-radius: 4px;
	padding: 10px 5px;
	font-size: 15px;
	margin-bottom: 25px;
`;
export const AlertSuccess = styled.p`
	background-color: #d1e7dd;
	color: #0f5132;
	padding: 8px 6px;
	margin-bottom: 5px;
	border-radius: 4px;
	border: 1px solid #badbcc;
`;
export const AlertDanger = styled.p`
	background-color: #f8d7da;
	color: #842029;
	padding: 8px 6px;
	margin-bottom: 5px;
	border-radius: 4px;
	border: 1px solid #f5c2c7;
`;