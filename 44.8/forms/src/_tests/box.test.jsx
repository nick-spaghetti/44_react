import React from "react";
import { render } from "@testing-library/react";
import Box from "../props/box";

it("renders without crashing", () => {
	render(<Box />);
});

it("matches snapshot", () => {
	const { asFragment } = render(<Box />);
	expect(asFragment()).toMatchSnapshot();
});
