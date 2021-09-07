import React from "react";
import { render } from "@testing-library/react";
import DadJokes from "./DadJokes";

describe("Elements - DadJokes", () => {
  test("without any jokes theres nothing to render", async () => {
    const { queryByTestId, container } = render(<DadJokes />);

    expect(queryByTestId("joke-list-item")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("with empty jokes list theres nothing to render", async () => {
    const { queryByTestId, container } = render(<DadJokes jokes={[]} />);

    expect(queryByTestId("joke-list-item")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("given an array of jokes, it renders all jokes", async () => {
    const jokes = [
      {
        id: "0ga2EdN7prc",
        joke: "How come the stadium got hot after the game? Because all of the fans left.",
      },
      {
        id: "0oO71TSv4Ed",
        joke: "Why was it called the dark ages? Because of all the knights. ",
      },
      { id: "0oz51ozk3ob", joke: "A steak pun is a rare medium well done." },
    ];
    const { getAllByTestId, container } = render(<DadJokes jokes={jokes} />);

    expect(getAllByTestId("joke-list-item")).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });
});
