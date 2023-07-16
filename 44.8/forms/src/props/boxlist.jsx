import React, { useState } from "react";
import Box from "./box";
import NewBoxForm from "./newboxform";

const BoxList = () => {
	const initialState = [];
	const addBox = (newBox) => {
		setBoxes((boxes) => [
			...boxes,
			{
				...newBox,
			},
		]);
	};
	const remove = (id) => {
		setBoxes((boxes) => boxes.filter((box) => box.id !== id));
	};
	const [boxes, setBoxes] = useState(initialState);
	const boxComp = boxes.map((box) => (
		<Box
			key={box.id}
			id={box.id}
			bgColor={box.bgColor}
			height={box.height}
			width={box.width}
			handleRemove={remove}
		/>
	));
	return (
		<>
			<NewBoxForm addBox={addBox} />
			{boxComp}
		</>
	);
};

export default BoxList;
