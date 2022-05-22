const BASE_URL = 'https://auth.nomoreparties.co';

function _getDataResponse(res) {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ password, email }) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"password": password,
			"email": email
		})
	})
	.then((res) => _getDataResponse(res))
	.catch((err) => console.log(err));
};

export const login = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(password, email)
		})
		.then((res) => _getDataResponse(res))
		.then((data) => {
			if (data.token) {
				localStorage.setItem('jwt', data.token);
				return data;
			}
		})
		.catch(err => console.log(err))
};

export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		})
		.then(res => res.json())
		.then(data => data)
}
