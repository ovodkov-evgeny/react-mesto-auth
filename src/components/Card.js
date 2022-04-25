import React from 'react';

function Card({ card, onCardClick }) {

	function handleClick() {
		onCardClick(card);
	}

	return (
		<>
			<img src={card.link} alt={card.name} className="elements__img" onClick={handleClick}/>
			<div className="elements__descr">
				<h3 className="elements__title">{card.name}</h3>
				<div className="elements__like-wrapper">
					<button className="elements__btn-like" type="button" aria-label="Like"></button>
					<span className="elements__like-count">{card.likes.length}</span>
				</div>
			</div>
			<button className="elements__btn-delete" type="button" aria-label="Delete"></button>
		</>
	);
}

export default Card;
