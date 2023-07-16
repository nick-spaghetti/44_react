import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "../props/todolist";

function addTodo(todoList, task = "write tests") {
	const taskInput = todoList.getByLabelText("task:");
	fireEvent.change(taskInput, { target: { value: task } });
	const submit = todoList.getByText("create");
	fireEvent.click(submit);
}

it("renders without crashing", () => {
	render(<TodoList />);
});

it("matches snapshot", function () {
	const { asFragment } = render(<TodoList />);
	expect(asFragment()).toMatchSnapshot();
});

it("can add a todo", () => {
	const list = render(<TodoList />);
	addTodo(list);
	expect(list.getByLabelText("task:")).toHaveValue("");
	expect(list.getByText("write tests")).toBeInTheDocument();
	expect(list.getByText("edit")).toBeInTheDocument();
	expect(list.getByText("X")).toBeInTheDocument();
});

it("can edit a todo", () => {
	const list = render(<TodoList />);
	addTodo(list);
	fireEvent.click(list.getByText("edit"));
	const editInput = list.getByDisplayValue("write tests");
	fireEvent.change(editInput, { target: { value: "sleep" } });
	fireEvent.click(list.getByText("update"));
	expect(list.getByText("sleep")).toBeInTheDocument();
	expect(list.queryByText("write tests")).not.toBeInTheDocument();
});

it("can delete a todo", () => {
	const list = render(<TodoList />);
	addTodo(list);
	fireEvent.click(list.getByText("X"));
	expect(list.queryByText("write tests")).not.toBeInTheDocument();
});
