import React, { useState } from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	
	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
	}

	return (
		<div className="page__container">
			<Header />
			<Main 
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
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

			{/* <template class="element-template">
				<li class="elements__list-item">
					<img src="#" alt=" " class="elements__img"/>
					<div class="elements__descr">
						<h3 class="elements__title"></h3>
						<div class="elements__like-wrapper">
							<button class="elements__btn-like" type="button" aria-label="Like"></button>
							<span class="elements__like-count"></span>
						</div>
					</div>
					<button class="elements__btn-delete" type="button" aria-label="Delete"></button>
				</li>
			</template> */}

			{/* <div className="popup popup_type_profile">
				<div class="popup__container">
					<h2 class="popup__title">Редактировать профиль</h2>
					<form action="#" class="form edit-form" name="edit" novalidate>
						<label class="form__label">
							<input class="form__input" id="name-input" type="text" name="name" placeholder="Имя" minlength="2" maxlength="40" required/>
							<span class="form__input-error name-input-error"></span>
						</label>
						<label class="form__label">
							<input class="form__input" id="about-input" type="text" name="about" placeholder="О себе" minlength="2" maxlength="200" required/>
							<span class="form__input-error about-input-error"></span>
						</label>
						<button class="popup__btn-save" type="submit">Сохранить</button>
					</form>
					<button class="popup__btn-close" type="button" aria-label="Закрыть"></button>
				</div>
			</div> */}

			{/* <div class="popup popup_type_card-add">
				<div class="popup__container">
					<h2 class="popup__title">Новое место</h2>
					<form action="#" class="form add-form" name="add-form" novalidate>
						<label class="form__label">
							<input class="form__input" id="title-input" type="text" name="title" placeholder="Название" minlength="2" maxlength="30" required/>
							<span class="form__input-error title-input-error"></span>
						</label>
						<label class="form__label">
							<input class="form__input" id="link-input" type="url" name="link" placeholder="Ссылка на картинку" required/>
							<span class="form__input-error link-input-error"></span>
						</label>
						<button class="popup__btn-save" type="submit">Создать</button>
					</form>
					<button class="popup__btn-close" type="button" aria-label="Закрыть"></button>
				</div>
			</div> */}

			{/* <div class="popup popup-image popup_type_image">
				<div class="popup-image__container">
					<figure class="popup-image__figure">
						<img src="#" alt="" class="popup-image__img"/>
						<figcaption class="popup-image__caption"></figcaption>
					</figure>
					<button class="popup__btn-close" type="button" aria-label="Закрыть"></button>
				</div>
			</div> */}

			<div className="popup popup_type_delete-confirm">
				<div className="popup__container">
					<h2 className="popup__title">Вы уверены?</h2>
					<form action="#" className="form delete-form" name="delete" noValidate>
						<button className="popup__btn-save" type="submit">Да</button>
					</form>
					<button className="popup__btn-close" type="button" ariaLabel="Закрыть"></button>
				</div>
			</div>

			{/* <div class="popup popup_type_avatar">
				<div class="popup__container">
					<h2 class="popup__title">Обновить аватар</h2>
					<form action="#" class="form avatar-form" name="avatar" novalidate>
						<label class="form__label">
							<input class="form__input" id="avatar-input" type="url" name="avatar" placeholder="Ссылка на картинку" required/>
							<span class="form__input-error avatar-input-error"></span>
						</label>
						<button class="popup__btn-save" type="submit">Сохранить</button>
					</form>
					<button class="popup__btn-close" type="button" aria-label="Закрыть"></button>
				</div>
			</div> */}
		</div>
	);
}

export default App;
