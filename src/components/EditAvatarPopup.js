import { useRef, useState, useEffect } from 'react';
import PopupWithForm  from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

	const link = useRef();
	const [isLinkValid, setLinkValid] = useState(false);
	const [linkValidationMessage, setLinkValidationMessage] = useState('');
	const [buttonText, setButtonText] = useState('Сохранить');

	function checkAvatarValidtion(link) {
		setLinkValid(link.validity.valid);
		setLinkValidationMessage(link.validationMessage);
	}

	useEffect(() => {
		link.current.value = '';
		setLinkValid(false);
		setLinkValidationMessage('');
		setButtonText('Сохранить');
	}, [isOpen]);

	function handleSubmit(evt) {
		evt.preventDefault();
		setButtonText('Сохранение...');
		onUpdateAvatar({
			avatar: link.current.value,
		});
		link.current.value = '';
	};
	
	return (
		<PopupWithForm
			title='Обновить аватар'
			name='avatar'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			>
			<label className="form__label">
				<input
					className="form__input"
					id="avatar-input"
					type="url"
					name="avatar"
					placeholder="Ссылка на картинку"
					ref={link}
					onChange={() => checkAvatarValidtion(link.current)}
					required/>
				<span className={`form__input-error ${isLinkValid ? '' : 'form__input-error_active'}`}>{linkValidationMessage}</span>
			</label>
			<button className={`popup__btn-save ${isLinkValid ? '' : 'popup__btn-save_disabled'}`} type="submit">{buttonText}</button>
		</PopupWithForm>
	)
};

export default EditAvatarPopup;
