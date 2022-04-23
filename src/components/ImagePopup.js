import React from 'react';

function ImagePopup() {
	return (
		<div className="popup popup-image popup_type_image">
			<div className="popup-image__container">
				<figure className="popup-image__figure">
					<img src="#" alt="" className="popup-image__img"/>
					<figcaption className="popup-image__caption"></figcaption>
				</figure>
				<button className="popup__btn-close" type="button" ariaLabel="Закрыть"></button>
			</div>
		</div>
	);
}

export default ImagePopup;
