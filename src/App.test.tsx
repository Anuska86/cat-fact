import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import App from "./App.tsx";

//Test 1: Initial State

test("displays initial welcome message", () => {
  render(<App />);
  expect(
    screen.getByText(/Click the button to get a cat fact!/i),
  ).toBeDefined();
});

//Test 2: Button interaction

test("button is clickable and exits", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /get a new cat fact/i });
  expect(button).toBeDefined();

  //Simulate a click
  fireEvent.click(button);
});

//Test 3: Mock the API and display a fact

test("mocks the API and displays a cat fact", async () => {
  const mockFact = "Cats have five toes on their front paws."; //fake fetch

  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      json: async () => ({ fact: mockFact }),
    } as Response),
  );

  render(<App />);

  //click the button to fetch
  const button = screen.getByRole("button", { name: /get a new cat fact/i });
  fireEvent.click(button);

  //check the fake fact
  const displayedFact = await screen.findByText(mockFact);
  expect(displayedFact).toBeDefined();

  vi.unstubAllGlobals(); //cleanup the mock
});
