import React from "react";
// import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom/extend-expect";
// import "isomorphic-fetch";

import CustomersTable from "../../src/components/customers/CustomersTable";

// global.fetch = fetch;

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

// const server = setupServer(
//   rest.get(
//     "https://rzp-training.herokuapp.com/team1/customers",
//     (req, res, ctx) => {
//       return res(ctx.json(fakeData));
//     }
//   )
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

test("renders CustomersTable", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => new Promise((resolve) => resolve(fakeData)),
    })
  );

  const { container } = render(
    <Router>
      <CustomersTable location={{ state: { submitSuccess: true } }} />
    </Router>
  );

  console.log(container);

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

test("handles error CustomersTable", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      json: () => new Promise((resolve) => resolve({ status: 500 })),
    })
  );
  //   server.use(
  //     rest.get("", (req, res, ctx) => {
  //       return res(ctx.status(500));
  //     })
  //   );

  const { container } = render(
    <Router>
      <CustomersTable location={{ state: { submitSuccess: true } }} />
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
