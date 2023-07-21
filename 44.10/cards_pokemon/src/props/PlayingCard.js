import React from "react";
import useFlipState from "../hooks/useFlipState";
import backOfCard from "../styles/back.png";
import "../styles/PlayingCard.css";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
	const [isFacingUp, flip] = useFlipState(false);
	return (
		<img
			src={isFacingUp ? front : back}
			alt="playing card"
			onClick={flip}
			className="PlayingCard Card"
		/>
	);
}

export default PlayingCard;
