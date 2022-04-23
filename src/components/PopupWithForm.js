import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose }) {
	return (
		<div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
			<div className="popup__container">
				<h2 className="popup__title">{title}</h2>
				<form action="#" className="form add-form" name={name} noValidate>
					{children}
					<button className="popup__btn-save" type="submit">Создать</button>
				</form>
				<button className="popup__btn-close" type="button" ariaLabel="Закрыть" onClick={onClose}></button>
			</div>
		</div>
	);
}

export default PopupWithForm;

