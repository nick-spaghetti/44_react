import React from "react";
import {
	render,
	fireEvent,
	queryAllByAltText,
	getByTestId,
} from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without breaking", () => {
	render(<Carousel />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

it("should go backwards", () => {
	const { getByTestId, queryByAltText } = render(<Carousel />);
	const leftbtn = getByTestId("left-arrow");
	const rightbtn = getByTestId("right-arrow");
	fireEvent.click(rightbtn);
	fireEvent.click(leftbtn);
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).not.toBeInTheDocument();
});

it("works when you click on the right arrow", function () {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId("right-arrow");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).not.toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).toBeInTheDocument();
});

it("hides arrows", () => {
	const { getByTestId } = render(<Carousel />);
	const left = getByTestId("left-arrow");
	const right = getByTestId("right-arrow");

	expect(left).toHaveClass("hidden");
	expect(right).not.toHaveClass("hidden");
	fireEvent.click(right);

	expect(left).not.toHaveClass("hidden");
	expect(right).not.toHaveClass("hidden");
	fireEvent.click(right);

	expect(left).not.toHaveClass("hidden");
	expect(right).toHaveClass("hidden");
});
