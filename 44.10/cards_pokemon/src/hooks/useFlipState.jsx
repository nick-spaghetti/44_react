import { useState } from "react";

const useFlipState = (initialState = true) => {
	const [isUp, setIsFacingUp] = useState(initialState);
	const flipCard = () => {
		setIsFacingUp((isUp) => !isUp);
	};
	return [isUp, flipCard];
};

export default useFlipState;
