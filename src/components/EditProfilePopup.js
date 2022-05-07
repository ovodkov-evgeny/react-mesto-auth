import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isNameValid, setNameValid] = useState(true);
	const [isDescriptionValid, setDescriptionValid] = useState(true);
	const [nameValidationMessage, setNameValidationMessage] = useState('');
	const [descriptionValidationMessage, setDescriptionValidationMessage] = useState('');
	const [isFormValid, setFormValid] = useState(false);
	const [buttonText, setButtonText] = useState('Сохранить');

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
		setNameValid(true);
		setDescriptionValid(true);
		setFormValid(true);
		setNameValidationMessage('');
		setDescriptionValidationMessage('');
		setButtonText('Сохранить');
	}, [currentUser, isOpen]);

	useEffect(() => {
		if (isNameValid && isDescriptionValid) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}, [isNameValid, isDescriptionValid]);

	function handleChange(evt) {
		switch (evt.target.name) {
			case 'name':
				setName(evt.target.value);
				setNameValidationMessage(evt.target.validationMessage);
				setNameValid(evt.target.validity.valid);
			break;
			case 'about':
				setDescription(evt.target.value);
				setDescriptionValidationMessage(evt.target.validationMessage);
				setDescriptionValid(evt.target.validity.valid);
			break;
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();

		setButtonText('Сохранение...');
		onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='profile'
			isOpen={isOpen}
			onClose={onClose}
			>
			<form className="form edit-form" name="profile" onSubmit={handleSubmit} noValidate>
				<label className="form__label">
					<input
						className="form__input"
						id="name-input"
						type="text"
						name="name"
						placeholder="Имя"
						minLength="2"
						maxLength="40"
						value={name || ''}
						onChange={handleChange}
						required/>
					<span className={`form__input-error ${isNameValid ? '' : 'form__input-error_active'}`}>{nameValidationMessage}</span>
				</label>
				<label className="form__label">
					<input
						className="form__input"
						id="about-input"
						type="text"
						name="about"
						placeholder="О себе"
						minLength="2"
						maxLength="200"
						value={description || ''}
						onChange={handleChange}
						required/>
					<span className={`form__input-error ${isDescriptionValid ? '' : 'form__input-error_active'}`}>{descriptionValidationMessage}</span>
				</label>
				<button className={`popup__btn-save ${isFormValid ? '' : 'popup__btn-save_disabled'}`} type="submit">{buttonText}</button>
			</form>
		</PopupWithForm>
	);
};

export default EditProfilePopup;
