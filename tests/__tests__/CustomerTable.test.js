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

  expect(container.querySelector("#load-img").getAttribute("alt")).toBe(
    "Loading...."
  );

  expect(container.querySelector(".content")).toMatchSnapshot();

  await waitFor(() => screen);

  expect(container.querySelector(".content")).toMatchSnapshot();

  expect(fetch).toHaveBeenCalledTimes(1);

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

// jest.useFakeTimers();

// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// describe("CustomersTable test", () => {
//   it("should render cust table", async () => {
//     const fakeData = {
//       entity: "collection",
//       items: [
//         {
//           name: "Jmp",
//           email: "J@rzp.com",
//           age: "32",
//           address: "123, Charming Avenue",
//           amount: 1231,
//         },
//       ],
//     };
//     global.fetch = jest.fn().mockImplementation(() =>
//       Promise.resolve({
//         json: () =>
//           new Promise((resolve) => setTimeout(() => resolve(fakeData), 1000)),
//       })
//     );

//     await act(async () => {
//       render(
//         <Router>
//           <CustomersTable location={{ state: { submitSuccess: true } }} />
//         </Router>,
//         container
//       );
//     });
//     expect(container.textContent).toContain("Customers");
//     expect(container.innerHTML).toMatchInlineSnapshot(
//       `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
//     );
//     // jest.runOnlyPendingTimers();

//     // act(() => {
//     //   jest.advanceTimersByTime(4000);
//     // });

//     await container;

//     expect(container.innerHTML).toMatchInlineSnapshot(
//       `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
//     );

//     const newCustBtn = document.querySelector("button");
//     expect(newCustBtn.textContent).toContain("New Customer");

//     act(() => {
//       newCustBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     });

//     expect(container.innerHTML).toMatchInlineSnapshot(
//       `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
//     );

//     global.fetch.mockClear();
//     delete global.fetch;
//   });
// });

// import "isomorphic-fetch";
// // global.fetch = fetch;

// test("real fetch call CustomersTable", async () => {
//   global.fetch = fetch;

//   const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
//   const result = await res.json();
//   expect(result.name).toBe("Leanne Graham"); // Success!

//   await act(async () => {
//     render(
//       <Router>
//         <CustomersTable location={{ state: { submitSuccess: true } }} />
//       </Router>,
//       container
//     );

//     expect(container.innerHTML).toMatchInlineSnapshot(
//       `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
//     );

//     // act(() => {
//     //   jest.advanceTimersByTime(4000);
//     // });

//     expect(container.innerHTML).toMatchInlineSnapshot(
//       `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
//     );

//     global.fetch.mockClear();
//     delete global.fetch;
//   });
// });
