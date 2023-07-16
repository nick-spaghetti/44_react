import React, { useState } from "react";
import { v4 } from "uuid";

const NewBoxForm = ({ addBox }) => {
	const initialState = {
		bgColor: "",
		height: 0,
		width: 0,
	};
	const [formData, setFormData] = useState(initialState);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		addBox({ ...formData, id: v4() });
		setFormData(initialState);
	};
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="bgColor">bgColor</label>
			<input
				type="text"
				id="bgColor"
				name="bgColor"
				placeholder="bgColor"
				value={formData.bgColor}
				onChange={handleChange}
			/>
			<label htmlFor="height">height</label>
			<input
				type="number"
				id="height"
				name="height"
				placeholder="height"
				value={formData.height}
				onChange={handleChange}
			/>
			<label htmlFor="width">width</label>
			<input
				type="number"
				id="width"
				name="width"
				placeholder="width"
				value={formData.width}
				onChange={handleChange}
			/>
			<button>add</button>
		</form>
	);
};

export default NewBoxForm;
