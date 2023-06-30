import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CoinContainer from "./coinContainer";

beforeEach(() => {
	jest.spyOn(Math, "random")
		.mockReturnValueOnce(0.25)
		.mockReturnValueOnce(0.75);
});

it("renders without crashing", () => {
	render(<CoinContainer />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<CoinContainer />);
	expect(asFragment).toMatchSnapshot();
});

it("doesn't show a coin on page load", () => {
	const { queryByTestId } = render(<CoinContainer />);
	expect(queryByTestId("coin")).toBeNull();
});

it("counts correctly when heads appears", () => {
	const { getByText, queryByAltText } = render(<CoinContainer />);
	const btn = getByText("flip");
	fireEvent.click(btn);

	expect(queryByAltText("head")).toBeInTheDocument();
	expect(queryByAltText("tail")).not.toBeInTheDocument();
	expect(
		getByText("out of 1 flips, there have been 1 heads and 0 tails")
	).toBeInTheDocument();
});

it("count correctly when tails appears", () => {
	const { getByText, queryByAltText } = render(<CoinContainer />);
	const btn = getByText("flip");
	fireEvent.click(btn);
	fireEvent.click(btn);

	expect(queryByAltText("tail")).toBeInTheDocument();
	expect(queryByAltText("head")).not.toBeInTheDocument();
	expect(
		getByText("out of 2 flips, there have been 1 heads and 1 tails")
	).toBeInTheDocument();
});

afterEach(() => {
	Math.random.mockRestore();
});
