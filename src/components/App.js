import React, { useState } from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	
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

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard(null);
	}

	return (
		<div className="page__container">
			<Header />
			<Main 
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
				onCardClick={handleCardClick}
			/>
			<Footer />

			<PopupWithForm
				title='Редактировать профиль'
				name='profile'
				isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}
				>
				<label className="form__label">
					<input className="form__input" id="name-input" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required/>
					<span className="form__input-error name-input-error"></span>
				</label>
				<label className="form__label">
					<input className="form__input" id="about-input" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required/>
					<span className="form__input-error about-input-error"></span>
				</label>
			</PopupWithForm>

			<PopupWithForm
				title='Новое место'
				name='card-add'
				isOpen={isAddPlacePopupOpen}
				onClose={closeAllPopups}
				>
				<label className="form__label">
					<input className="form__input" id="title-input" type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required/>
					<span className="form__input-error title-input-error"></span>
				</label>
				<label className="form__label">
					<input className="form__input" id="link-input" type="url" name="link" placeholder="Ссылка на картинку" required/>
					<span className="form__input-error link-input-error"></span>
				</label>
			</PopupWithForm>

			<PopupWithForm
				title='Обновить аватар'
				name='avatar'
				isOpen={isEditAvatarPopupOpen}
				onClose={closeAllPopups}
				>
				<label className="form__label">
					<input className="form__input" id="avatar-input" type="url" name="avatar" placeholder="Ссылка на картинку" required/>
					<span className="form__input-error avatar-input-error"></span>
				</label>
			</PopupWithForm>

			<ImagePopup card={selectedCard} onClose={closeAllPopups} />

			<div className="popup popup_type_delete-confirm">
				<div className="popup__container">
					<h2 className="popup__title">Вы уверены?</h2>
					<form action="#" className="form delete-form" name="delete" noValidate>
						<button className="popup__btn-save" type="submit">Да</button>
					</form>
					<button className="popup__btn-close" type="button" aria-label="Закрыть"></button>
				</div>
			</div>
		</div>
	);
}

export default App;
