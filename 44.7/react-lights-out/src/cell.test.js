import React from "react";
import Cell from "./Cell";
import { render, fireEvent } from "@testing-library/react";

describe("<Cell /> rendering", () => {
	let container;
	beforeEach(() => {
		let tr = document.createElement("tr");
		container = document.body.appendChild(tr);
	});

	it("should render without breaking", () => {
		render(<Cell />, { container });
	});

	it("matches snapshot", () => {
		const { asFragment } = render(<Cell isLit />, { container });
		expect(asFragment()).toMatchSnapshot();
	});

	it("matches snapshot when not lit", () => {
		const { asFragment } = render(<Cell />, { container });
		expect(asFragment()).toMatchSnapshot();
	});
});
