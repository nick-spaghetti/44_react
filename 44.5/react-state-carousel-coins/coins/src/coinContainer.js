import React, { useState } from "react";
import Coin from "./coin";
import { choice } from "./helpers";

const CoinContainer = (props) => {
	const [coin, setCoin] = useState(null);
	const [headCount, setHeadCount] = useState(0);
	const [tailCount, setTailCount] = useState(0);
	const handleClick = () => {
		const newCoin = choice(props.coins);
		setCoin(newCoin);
		if (newCoin.side === "head") {
			setHeadCount((oldCount) => oldCount + 1);
		} else {
			setTailCount((oldCount) => oldCount + 1);
		}
	};

	const currCoin = coin ? (
		<Coin
			side={coin.side}
			imgSrc={coin.imgSrc}
		/>
	) : null;
	return (
		<div className="CoinContainer">
			<h2>lets flip a coin</h2>
			{currCoin}
			<button onClick={handleClick}>flip</button>
			<p>
				out of {headCount + tailCount} flips, there have been{" "}
				{headCount} heads and {tailCount} tails
			</p>
		</div>
	);
};

CoinContainer.defaultProps = {
	coins: [
		{
			side: "head",
			imgSrc: "https://i.pcgs.com/s3/cu-pcgs/Photograde/500/Kennedy-64o.jpg",
		},
		{
			side: "tail",
			imgSrc: "https://i.pcgs.com/s3/cu-pcgs/Photograde/500/Kennedy-64r.jpg",
		},
	],
};

export default CoinContainer;
