import React, { useState, useEffect } from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

	const [userName, setUserName] = useState();
	const [userDescription, setUserDescription] = useState();
	const [userAvatar, setUserAvatar] = useState();
	const [cards, setCards] = useState([]);

	useEffect(() => {
		api.getProfileInfo()
		.then(user => {
			setUserName(user.name);
			setUserDescription(user.about);
			setUserAvatar(user.avatar);
		})
		.catch(err => console.log(err))
	}, []);

	useEffect(() => {
		api.getInitialCards()
		.then(card => {
			setCards(card)})
		.catch(err => console.log(err))
	}, []);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__info">
					<img src={userAvatar} alt="Аватар профиля" className="profile__avatar"/>
					<div className="profile__avatar-overlay">
						<button className="profile__avatar-edit" type="button" onClick={onEditAvatar}></button>
					</div>
					<div className="profile__heading">
						<div className="profile__title">
							<h1 className="profile__name">{userName}</h1>
							<button className="profile__btn-edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
						</div>
						<p className="profile__text">{userDescription}</p>
					</div>
				</div>
				<button className="profile__btn-add" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
			</section>

			<section className="elements">
				<ul className="elements__list">
					{cards.map((card) => (
						<li className="elements__list-item" key={card._id}>
							<Card 
								card={card}
								onCardClick={onCardClick}
							/>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}

export default Main;
