import React from "react";
import Board from "./Board";
import { render, fireEvent } from "@testing-library/react";

describe("<Board /> rendering", () => {
	it("should render without breaking", () => {
		render(<Board />);
	});

	it("matches snapshot", () => {
		const { asFragment } = render(<Board />);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should show text", () => {
		const { getByText } = render(<Board chanceLightStartsOn={0} />);
		expect(getByText("you win")).toHaveTextContent("you win");
		expect(getByText("you win")).toBeInTheDocument();
	});
});

describe("cell click", () => {
	it("toggles lights", () => {
		const { getAllByRole } = render(
			<Board
				nrows={3}
				ncols={3}
				chanceLightStartsOn={1}
			/>
		);
		const cells = getAllByRole("button");
		cells.forEach((cell) => {
			expect(cell).toHaveClass("Cell-lit");
		});
		fireEvent.click(cells[4]);
		let litIndices = [0, 2, 6, 8];
		cells.forEach((cell, idx) => {
			if (litIndices.includes(idx)) {
				expect(cell).toHaveClass("Cell-lit");
			} else {
				expect(cell).not.toHaveClass("Cell-lit");
			}
		});
	});
	it("says you won", () => {
		const { queryByText, getAllByRole } = render(
			<Board
				nrows={1}
				ncols={3}
				chanceLightStartsOn={1}
			/>
		);
		expect(queryByText("you win")).not.toBeInTheDocument();
		const cells = getAllByRole("button");
		fireEvent.click(cells[1]);
		expect(queryByText("you win")).toBeInTheDocument();
	});
});
