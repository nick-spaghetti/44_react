import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "../props/todo";

it("renders without crashing", () => {
	render(<Todo />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<Todo />);
	expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when editing", () => {
	const { asFragment, getByText } = render(<Todo />);
	const edit = getByText("edit");
	fireEvent.click(edit);
	expect(asFragment()).toMatchSnapshot();
});

it("runs the update function on form submit", () => {
	const update = jest.fn();
	const { getByText } = render(<Todo update={update} />);
	const edit = getByText("edit");
	fireEvent.click(edit);
	const updateBtn = getByText("update");
	fireEvent.click(updateBtn);
	expect(update).toHaveBeenCalled();
});

it("runs the delete function on button click", () => {
	const remove = jest.fn();
	const { getByText } = render(<Todo remove={remove} />);
	const deleteBtn = getByText("X");
	fireEvent.click(deleteBtn);
	expect(remove).toHaveBeenCalled();
});
