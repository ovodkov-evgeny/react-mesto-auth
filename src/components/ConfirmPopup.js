import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onCardDelete }) {

	const [buttonText, setButtonText] = useState('Да');

	function handleSubmit(evt) {
		evt.preventDefault();
		setButtonText('Удаление...');

		onCardDelete();
	}

	return (
		<PopupWithForm
			name='delete-confirm'
			title='Вы уверены?'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<button className="popup__btn-save" type="submit">{buttonText}</button>
		</PopupWithForm>
	);
}

export default ConfirmPopup;
