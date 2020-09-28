import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ItemsTable from "../../src/components/items/ItemsTable";

const fakeData = {
  entity: "collection",
  items: [
    {
      name: "Jmp",
      email: "J@rzp.com",
      age: "32",
      address: "123, Charming Avenue",
      amount: 1231,
    },
  ],
};

test("renders ItemsTable", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => new Promise((resolve) => resolve(fakeData)),
    })
  );

  const { container } = render(
    <Router>
      <ItemsTable location={{ state: { submitSuccess: true } }} />
    </Router>
  );

  expect(container.querySelector("#load-img").getAttribute("alt")).toBe(
    "Loading...."
  );

  expect(container.querySelector(".content")).toMatchSnapshot();

  await waitFor(() => screen);

  expect(container.querySelector(".content")).toMatchSnapshot();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(container.querySelector("tbody").textContent).toContain("Jmp");

  global.fetch.mockClear();
  delete global.fetch;
});

test("handles error ItemsTable", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      json: () => new Promise((resolve) => resolve({ status: 500 })),
    })
  );

  const { container } = render(
    <Router>
      <ItemsTable location={{ state: { submitSuccess: true } }} />
    </Router>
  );
  expect(container.querySelector("#load-img").getAttribute("alt")).toBe(
    "Loading...."
  );

  expect(container).toMatchSnapshot();

  await waitFor(() => screen);

  expect(container.querySelector(".content")).toMatchSnapshot();

  global.fetch.mockClear();
  delete global.fetch;
});
