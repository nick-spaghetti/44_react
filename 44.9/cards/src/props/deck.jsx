import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./card";
const base = `http://deckofcardsapi.com/api/deck`;

const Deck = () => {
	// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
	// const suits = ["heart", "diamond", "spade", "club"];
	// const [card, setCard] = useState({});
	// const getRandomCard = () => {
	// 	const randomNum = Math.floor(Math.random() * nums.length);
	// 	const cardValue = nums[randomNum];
	// 	const suitIndex = Math.floor(Math.random() * suits.length);
	// 	const cardSuit = suits[suitIndex];

	// 	const cardDetails = {
	// 		value: cardValue,
	// 		suit: cardSuit,
	// 	};

	// 	setCard(cardDetails);
	// };
	// return (
	// 	<div className="Deck">
	// 		<button onClick={getRandomCard}>draw a card</button>
	// 		{card.value && (
	// 			<Card
	// 				value={card.value}
	// 				suit={card.suit}
	// 				className={"card"}
	// 			/>
	// 		)}
	// 	</div>
	// );

	const [deck, setDeck] = useState(null);
	const [drawn, setDrawn] = useState([]);
	const [autoDraw, setAutoDraw] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		async function getData() {
			let d = await axios.get(`${base}/new/shuffle/`);
			setDeck(d.data);
		}
		getData();
	}, [setDeck]);

	useEffect(() => {
		async function getCard() {
			let { deckId } = deck;
			try {
				let drawnRes = await axios.get(`${base}/${deckId}/draw`);
				if (drawnRes.data.remaining === 0) {
					setAutoDraw(false);
					throw new Error("no cards remaining");
				}
				const card = drawnRes.data.cards[0];
				setDrawn((d) => [
					...d,
					{
						id: card.node,
						name: card.suit + " " + card.value,
					},
				]);
			} catch (e) {
				alert(e);
				console.log(e);
			}
		}
		if (autoDraw && !timerRef.current) {
			timerRef.current = setInterval(async () => {
				await getCard();
			}, 1000);
		}
		return () => {
			clearInterval(timerRef.current);
			timerRef.current = null;
		};
	}, [autoDraw, setAutoDraw, deck]);

	const toggleAutoDraw = () => {
		setAutoDraw((auto) => !auto);
	};

	const cards = drawn.map((c) => (
		<Card
			key={c.id}
			name={c.name}
			image={c.image}
		/>
	));

	return (
		<div className="Deck">
			{deck ? (
				<button
					className="Deck-gimme"
					onClick={toggleAutoDraw}>
					{autoDraw ? "stop" : "keep"} drawing for me
				</button>
			) : null}
			<div className="'Deck-cardarea">{cards}</div>
		</div>
	);
};

export default Deck;
