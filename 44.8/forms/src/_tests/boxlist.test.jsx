import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import BoxList from "../props/boxlist";

function addBox(boxList, height = "2", width = "2", color = "peachpuff") {
	const heightInput = boxList.getByLabelText("height");
	const widthInput = boxList.getByLabelText("width");
	const backgroundInput = boxList.getByLabelText("bgColor");
	fireEvent.change(backgroundInput, { target: { value: color } });
	fireEvent.change(widthInput, { target: { value: width } });
	fireEvent.change(heightInput, { target: { value: height } });
	const btn = boxList.getByText("add");
	fireEvent.click(btn);
}

it("renders without crashing", () => {
	render(<BoxList />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<BoxList />);
	expect(asFragment()).toMatchSnapshot();
});

it("can add a new box", () => {
	const boxList = render(<BoxList />);
	expect(boxList.queryByText("remove")).not.toBeInTheDocument();
	addBox(boxList);
	const removeBtn = boxList.getByText("X");
	expect(removeBtn).toBeInTheDocument();
	expect(removeBtn.previousSibling).toHaveStyle(`
		width: 2em;
		height: 2em;
		background-color: peachpuff;
  `);
	expect(boxList.getAllByDisplayValue("")).toHaveLength(1);
});

it("can remove a box", () => {
	const boxList = render(<BoxList />);
	addBox(boxList);
	const removeBtn = boxList.getByText("X");
	fireEvent.click(removeBtn);
	expect(removeBtn).not.toBeInTheDocument();
});
