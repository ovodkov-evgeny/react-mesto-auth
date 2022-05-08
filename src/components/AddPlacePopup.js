import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [isNameValid, setNameValid] = useState(false);
	const [isLinkValid, setLinkValid] = useState(false);
	const [nameValidationMessage, setNameValidationMessage] = useState('');
	const [linkValidationMessage, setLinkValidationMessage] = useState('');
	const [isFormValid, setFormValid] = useState(false);
	const [buttonText, setButtonText] = useState('Создать');

	function handleChange(evt) {
		switch (evt.target.name) {
			case 'title':
				setName(evt.target.value);
				setNameValidationMessage(evt.target.validationMessage);
				setNameValid(evt.target.validity.valid);
			break;
			case 'link':
				setLink(evt.target.value);
				setLinkValidationMessage(evt.target.validationMessage);
				setLinkValid(evt.target.validity.valid);
			break;
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();

		setButtonText('Создание...');

		onAddPlace({
			name,
			link,
		});
	}

	useEffect(() => {
		setName('');
		setLink('');
		setNameValid(false);
		setLinkValid(false);
		setFormValid(false);
		setNameValidationMessage('');
		setLinkValidationMessage('');
		setButtonText('Создать');
	}, [isOpen]);

	useEffect(() => {
		if (isNameValid && isLinkValid) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
	}, [isNameValid, isLinkValid]);

	return (
		<PopupWithForm
			title='Новое место'
			name='card-add'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			>
			<label className="form__label">
				<input
					className="form__input"
					id="title-input"
					type="text"
					name="title"
					placeholder="Название"
					minLength="2"
					maxLength="30"
					value={name || ''}
					onChange={handleChange}
					required
				/>
				<span className={`form__input-error ${isNameValid ? '' : 'form__input-error_active'}`}>{nameValidationMessage}</span>
			</label>
			<label className="form__label">
				<input
					className="form__input"
					id="link-input"
					type="url"
					name="link"
					placeholder="Ссылка на картинку"
					value={link || ''}
					onChange={handleChange}
					required/>
				<span className={`form__input-error ${isLinkValid ? '' : 'form__input-error_active'}`}>{linkValidationMessage}</span>
			</label>
			<button className={`popup__btn-save ${isFormValid ? '' : 'popup__btn-save_disabled'}`} type="submit">{buttonText}</button>	
		</PopupWithForm>
	);
}

export default AddPlacePopup;
