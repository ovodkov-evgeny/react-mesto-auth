import { useRef, useState, useEffect } from 'react';
import PopupWithForm  from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

	const link = useRef();
	
	const [buttonText, setButtonText] = useState('Сохранить');

	const [values, setValues] = useState({
		message: '',
		isValid: false,
	});

	useEffect(() => {
		link.current.value = '';
		setValues((values) => ({
			...values,
			message: ''
		}))
		
		setButtonText('Сохранить');
	}, [isOpen]);

	const checkAvatarValidtion = (link) => {
		setValues((values) => ({
			...values,
			message: link.validationMessage,
			isValid: link.validity.valid
		}));
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		
		setButtonText('Сохранение...');
		onUpdateAvatar({
			avatar: link.current.value,
		});
	}
	
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
				<span className={`form__input-error ${values.isValid ? '' : 'form__input-error_active'}`}>{values.message}</span>
			</label>
			<button className={`popup__btn-save ${values.isValid ? '' : 'popup__btn-save_disabled'}`} type="submit">{buttonText}</button>
		</PopupWithForm>
	)
};

export default EditAvatarPopup;
