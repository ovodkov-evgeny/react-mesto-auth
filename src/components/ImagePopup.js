import React from 'react';

function ImagePopup({ card, onClose }) {
	return (
		<div className={`popup popup-image ${card && 'popup_opened'}`}>
			{card && (<div className="popup-image__container">
				<figure className="popup-image__figure">
					<img src={card.link} alt={card.name} className="popup-image__img"/>
					<figcaption className="popup-image__caption">{card.name}</figcaption>
				</figure>
				<button className="popup__btn-close" type="button" onClick={onClose} aria-label="Закрыть"></button>
			</div>
			)}
		</div>
	);
}

export default ImagePopup;
