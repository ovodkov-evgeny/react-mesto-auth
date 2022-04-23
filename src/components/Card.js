import React from 'react';

function Card({ card }) {
	return (
		<>
			<img src={card.link} alt={card.name} className="elements__img"/>
			<div className="elements__descr">
				<h3 className="elements__title">{card.name}</h3>
				<div className="elements__like-wrapper">
					<button className="elements__btn-like" type="button" ariaLabel="Like"></button>
					<span className="elements__like-count">{card.likes.length}</span>
				</div>
			</div>
			<button className="elements__btn-delete" type="button" ariaLabel="Delete"></button>
		</>
	);
}

export default Card;
