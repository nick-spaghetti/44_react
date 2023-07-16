import React from "react";

const Box = ({ id, bgColor, height, width, handleRemove }) => {
	const remove = () => handleRemove(id);
	return (
		<>
			<div
				className="Box"
				style={{
					backgroundColor: bgColor,
					height: `${height}em`,
					width: `${width}em`,
				}}></div>
			<button onClick={remove}>X</button>;
		</>
	);
};

export default Box;
