import React, {createContext, useEffect, useState} from 'react';

import api from '../config/configApi';

const Context = createContext();

// const headers = {
// 			'headers': {
// 				'Content-Type': 'application/json',
// 				'Authorization': 'Bearer ' + localStorage.getItem('token')
// 		}
// 	}

function AuthProvider({children}) {
	const [authenticated, setAuthenticated] = useState(false);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getLogin = async () => {
			const token = localStorage.getItem('token');

			if(token){
				// api.default.headers.Authorization = `Bearer ${(token)}`;
				setAuthenticated(true);
			}
			setLoading(false);
		}

		getLogin()
	}, []);

	if (loading) {
		return <h1>Carregando</h1>
	}

	function signIn(sit){
	 	setAuthenticated(Context);
	}

	function handleLogout() {
		setAuthenticated(false);
		localStorage.removeItem('token');
		api.default.headers.Authorization = undefined;
	}

	return(
		<Context.Provider value={{authenticated, signIn, handleLogout}}>
			{children}
		</Context.Provider>
	)
} 

export {Context, AuthProvider};