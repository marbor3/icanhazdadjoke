import React from "react";
import { render } from "@testing-library/react";
import DadJoke from "./DadJoke";

describe("Elements - DadJoke", () => {
  test("renders given joke", async () => {
    const joke =
      "How come the stadium got hot after the game? Because all of the fans left.";
    const { getByTestId, container } = render(<DadJoke joke={joke} />);

    expect(getByTestId("joke")).toHaveTextContent(joke);
    expect(container).toMatchSnapshot();
  });
});
