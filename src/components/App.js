import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmPopup from './ConfirmPopup.js';

import { api } from '../utils/Api.js';
import * as auth from '../utils/auth.js';


function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [isRegistrationPageOpen, setIsRegistrationPageOpen] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [cardDelete, setCardDelete] = useState({});

	const [currentUser, setCurrentUser] = useState({});
	const [userEmail, setUserEmail] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	// const [successRegistration, setSuccessRegistration] = useState(false);

	const navigation = useNavigate();
	
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleConfirmDelete(card) {
		setIsConfirmPopupOpen(true);
		setCardDelete(card);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(like => like._id === currentUser._id);
	
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => {
			setCards((state) => state.map(c => c._id === card._id ? newCard : c));
		})
		.catch((err) => console.log(err));
	}

	function handleCardDelete() {
		api.deleteCard(cardDelete._id)
		.then(() => {
			setCards((state) => state.filter((c) => c._id !== cardDelete._id));
			closeAllPopups();
		})
		.catch((err) => console.log(err));
	}

	function handleUpdateUser(user) {
		api.setProfileInfo(user)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleUpdateAvatar({avatar}) {
		api.editAvatar(avatar)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleAddPlace(card) {
		api.addNewCard(card)
			.then(newCard => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleEscClose(evt) {
		if (evt.key === 'Escape') {
			evt.preventDefault();
			closeAllPopups();
		}
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setSelectedCard(null);
		setIsRegistrationPageOpen(false);
	}

	// function onRegister(data) {
	// 	// console.log(data);
	// 	auth.register(data)
	// 		.then((res) => {
	// 			if (res) {
	// 				setSuccessRegistration(true);
	// 				setIsRegistrationPageOpen(true);
	// 				navigation('/sign-in');
	// 			} else {
	// 				setSuccessRegistration(false);
	// 				setIsRegistrationPageOpen(true);
	// 			}
	// 		})
	// 		.catch((err) => console.log(err));
	// }

	// function onLogin(data) {
	// 	console.log(data);
	// 	auth.login(data)
	// 		.then((res) => {
	// 			if (res) {
	// 				setUserEmail(res.email);
	// 				setLoggedIn(true);
	// 				localStorage.setItem('loggedIn', 'true');
	// 				api.getProfileInfo()
	// 					.then((res) => {
	// 						console.log(res);
	// 						setCurrentUser(res)})
	// 					.catch((err) => console.log(err));
	// 				navigation('/');
	// 			} else {
	// 				setIsRegistrationPageOpen(true);
	// 			}
	// 		})
	// 		.catch((err) => console.log(err));
	// }

	// function handleRegister(password, email) {
	// 	return register(password, email)
	// 	 .then(() => {
	// 		 navigation('/sign-in')
	// 	 })
	// 	 .catch(err => console.log(err));
	// }
 
	// function handleLogin(password, email) {
	// 	return login(password, email)
	// 	.then(data => {
	// 	 if(data.jwt) {
	// 		 localStorage.setItem('jwt', data.jwt);
	// 	 }
	//  })
	// }
 

	// function onSignOut() {
	// 	auth.logout()
	// 		.then(() => {
	// 			localStorage.setItem('loggedIn', 'false');
	// 			setLoggedIn(false);
	// 			setUserEmail('');
	// 		})
	// 		.catch((err) => console.log(err))
	// }

	// useEffect(() => {
	// 	if (localStorage.getItem('loggedIn') === 'true') {
	// 		api.getProfileInfo()
	// 			.then((res) => {
	// 				if (res) {
	// 					setLoggedIn(true);
	// 					navigation('/');
	// 					setUserEmail(res.email);
	// 				}
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// 	const handleEscClose = (evt) => {
	// 		if (evt.key === 'Escape') {
	// 			evt.preventDefault();
	// 			closeAllPopups();
	// 		}
	// 	};

	// 	document.addEventListener('keydown', handleEscClose);
	// 	return () => document.removeEventListener('keydown', handleEscClose);
	// }, []);

	// useEffect(() => {
	// 	if (loggedIn) {
	// 		Promise.all([api.getInitialCards(), api.getProfileInfo()])
	// 			.then(([cards, user]) => {
	// 				setCards(cards);
	// 				setCurrentUser(user);
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// }, [loggedIn]);

	// 	useEffect(() => {
	// 		if (localStorage.getItem('loggedIn') === 'true') {
	// 			api
	// 				.getUser()
	// 				.then((res) => {
	// 					if (res) {
	// 						setLoggedIn(true);
	// 						navigate('/');
	// 						setUserEmail(res.email);
	// 					}
	// 				})
	// 				.catch((err) => console.log(err))
	// 		}
	// 	});

	// useEffect(() => {
	// 	api.getProfileInfo()
	// 	.then(user => setCurrentUser(user))
	// 	.catch(err => console.log(err));

	// 	api.getInitialCards()
	// 	.then(card => {
	// 		setCards(card)})
	// 	.catch(err => console.log(err));
	// }, []);

	useEffect(() => {
		document.addEventListener('keydown', handleEscClose);
		return () => document.removeEventListener('keydown', handleEscClose);
	}, []);

	useEffect(() => {
		handleTokenCheck();
		if (loggedIn) {
			Promise.all([api.getProfileInfo(), api.getInitialCards()])
				.then(([userData, cardData]) => {
					setCurrentUser(userData);
					setCards(cardData);
				})
				.catch((err) => console.log(`Ошибка ${err}`))
				.finally(() => { });
		}
	}, [loggedIn]);

	function onRegister(email, password) {
		auth.register(email, password)
			.then((res) => {
				if (res) {
					// setInfoPopupOpen(true);
					// setIsReg(true);
					navigation('/sign-in');
				} else {
					// setInfoPopupOpen(true);
					// setIsReg(false);
					console.log('else')
				}
			})
			.catch((err) => {
				// setInfoPopupOpen(true);
				console.log(`Ошибка входа ${err}`)
				// setIsReg(false);
			})
	}

	function onLogin(email, password) {
		auth.login(email, password)
			.then((data) => {
				localStorage.setItem("jwt", data.token);
				setUserEmail(email);
				setLoggedIn(true);
				navigation('/');
			})
			.catch((err) => {
				// setInfoPopupOpen(true);
				console.log(`Ошибка входа ${err}`)
				// setIsReg(false);
			})
			.finally(() => { });

	}

	function onSignOut() {
		localStorage.removeItem("jwt");
		setLoggedIn(false);
		setUserEmail('');
		navigation('/sign-in');
	}

	function handleTokenCheck() {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			auth.checkToken(jwt)
				.then((res) => {
					setLoggedIn(true);
					navigation('/');
					setUserEmail(res.data.email);
				})
		}
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page__container">
				<Header email={userEmail} loggedIn={loggedIn} exit={onSignOut} />
				<Routes>
					<Route
						exact path='/'
						element= {
							<ProtectedRoute loggedIn={loggedIn}>
								<Main 
									cards={cards}
									onEditProfile={handleEditProfileClick}
									onAddPlace={handleAddPlaceClick}
									onEditAvatar={handleEditAvatarClick}
									onCardClick={handleCardClick}
									onCardLike={handleCardLike}
									onCardDelete={handleConfirmDelete}
								/>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/sign-up"
						element={
							<Register
								register={onRegister}
								// isPopupOpen={isRegistrationPageOpen}
								// openPopup={setIsRegistrationPageOpen}
								// closePopup={closeAllPopups}
							/>
						}
					/>
					<Route
						path="/sign-in"
						element={
							<Login
								login={onLogin}
								// isPopupOpen={isRegistrationPageOpen}
								// openPopup={setIsRegistrationPageOpen}
								// closePopup={closeAllPopups}
							/>
						}
					/>
				</Routes>
				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlace}
				/>

				<ConfirmPopup
					isOpen={isConfirmPopupOpen}
					onClose={closeAllPopups}
					onCardDelete={handleCardDelete}
				/>

				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
