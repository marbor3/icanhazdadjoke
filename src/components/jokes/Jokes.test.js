import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import Jokes from "./Jokes";

const firstPageOfJokes = {
  current_page: 1,
  limit: 3,
  next_page: 2,
  previous_page: 1,
  results: [
    {
      id: "0ga2EdN7prc",
      joke: "How come the stadium got hot after the game? Because all of the fans left.",
    },
    {
      id: "0oO71TSv4Ed",
      joke: "Why was it called the dark ages? Because of all the knights. ",
    },
    {
      id: "0oz51ozk3ob",
      joke: "A steak pun is a rare medium well done.",
    },
  ],
  search_term: "",
  status: 200,
  total_jokes: 7,
  total_pages: 3,
};

const secondPageOfJokes = {
  current_page: 2,
  limit: 3,
  next_page: 3,
  previous_page: 1,
  results: [
    {
      id: "0ozAXv4Mmjb",
      joke: "Why did the tomato blush? Because it saw the salad dressing.",
    },
    {
      id: "0wcFBQfiGBd",
      joke: "Did you hear the joke about the wandering nun? She was a roman catholic.",
    },
    {
      id: "189xHQ7pOuc",
      joke: "What creature is smarter than a talking parrot? A spelling bee.",
    },
  ],
  search_term: "",
  status: 200,
  total_jokes: 7,
  total_pages: 3,
};

const lastPageOfJokes = {
  current_page: 3,
  limit: 3,
  next_page: 3,
  previous_page: 2,
  results: [
    {
      id: "0ga2EdN7prc",
      joke: "How come the stadium got hot after the game? Because all of the fans left.",
    },
  ],
  search_term: "",
  status: 200,
  total_jokes: 7,
  total_pages: 3,
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});

const server = setupServer(
  rest.get("https://icanhazdadjoke.com/search", (req, res, ctx) => {
    const query = req.url.searchParams;
    const limit = query.get("limit");
    const page = parseInt(query.get("page"));

    let result = firstPageOfJokes;

    if (page === 2) {
      result = secondPageOfJokes;
    } else if (page == 3) {
      result = lastPageOfJokes;
    }

    return res(ctx.json(result));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Components - Jokes", () => {
  test("renders first page of jokes", async () => {
    let renderedComponent;

    act(() => {
      renderedComponent = render(<Jokes page={1} />);
    });

    await waitFor(() => screen.getAllByTestId("joke"));

    expect(screen.getAllByTestId("joke")).toHaveLength(3);
    expect(screen.getAllByTestId("joke")[0]).toHaveTextContent(
      "How come the stadium got hot after the game? Because all of the fans left."
    );
    expect(screen.getByTestId("prev")).toBeDisabled();
    expect(screen.getByTestId("next")).toBeEnabled();

    const { container } = renderedComponent;
    expect(container).toMatchSnapshot();
  });

  test("on clicking next renders next page of jokes", async () => {
    let renderedComponent;

    act(() => {
      renderedComponent = render(<Jokes page={1} />);
    });

    await waitFor(() => screen.getAllByTestId("joke"));

    fireEvent.click(screen.getByTestId("next"));
    await waitForElementToBeRemoved(screen.getAllByTestId("joke"));
    await act(async () => {});
    await waitFor(() => screen.getAllByTestId("joke"));

    expect(screen.getAllByTestId("joke")).toHaveLength(3);
    expect(screen.getAllByTestId("joke")[0]).toHaveTextContent(
      "Why did the tomato blush? Because it saw the salad dressing."
    );
    expect(screen.getByTestId("prev")).toBeEnabled();
    expect(screen.getByTestId("next")).toBeEnabled();

    const { container } = renderedComponent;
    expect(container).toMatchSnapshot();
  });

  test("going to last page disables next button", async () => {
    let renderedComponent;

    act(() => {
      renderedComponent = render(<Jokes page={3} />);
    });

    await waitFor(() => screen.getAllByTestId("joke"));

    expect(screen.getByTestId("next")).toBeDisabled();

    const { container } = renderedComponent;
    expect(container).toMatchSnapshot();
  });
});
