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
  expect(button).toBeDefined;

  //Simulate a click
  fireEvent.click(button);
});
