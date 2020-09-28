import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import App from "../../src/components/App";

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

test("should render customer list and form inside App", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => new Promise((resolve) => resolve(fakeData)),
    })
  );

  const { container } = render(
    <Router>
      <App />
    </Router>
  );

  expect(container.textContent).toContain("Customers");
  expect(container.textContent).toContain("Items");
  expect(container.textContent).toContain("Invoices");
  expect(container).toMatchSnapshot();

  const custBtn = container.getElementsByClassName("customers")[0];
  const itemsBtn = container.getElementsByClassName("items")[0];
  const invoicesBtn = container.getElementsByClassName("invoices")[0];

  expect(custBtn.textContent).toContain("Customers");
  expect(itemsBtn.textContent).toContain("Items");
  expect(invoicesBtn.textContent).toContain("Invoices");

  expect(custBtn.classList.contains("active")).toBeFalsy();
  expect(itemsBtn.classList.contains("active")).toBeFalsy();
  expect(invoicesBtn.classList.contains("active")).toBeFalsy();

  // Click on customers tab
  fireEvent.click(custBtn);

  await waitFor(() => container);

  expect(custBtn.classList.contains("active")).toBeTruthy();
  expect(itemsBtn.classList.contains("active")).toBeFalsy();
  expect(invoicesBtn.classList.contains("active")).toBeFalsy();

  expect(container).toMatchSnapshot();
  expect(container.querySelector(".content").textContent).toContain(
    "Customers"
  );

  const newCustBtn = container.querySelector(".content #button");

  fireEvent.click(newCustBtn);

  await waitFor(() => container);

  expect(container.querySelector(".content").textContent).toContain("Email");
  expect(container.querySelectorAll(".content input").length).toBe(3);
  expect(container).toMatchSnapshot();

  // CLick on items tab
  fireEvent.click(itemsBtn);

  await waitFor(() => container);

  expect(custBtn.classList.contains("active")).toBeFalsy();
  expect(itemsBtn.classList.contains("active")).toBeTruthy();
  expect(invoicesBtn.classList.contains("active")).toBeFalsy();

  expect(container).toMatchSnapshot();
  expect(container.querySelector(".content").textContent).toContain("Items");

  const newItemBtn = container.querySelector(".content #button");
  fireEvent.click(newItemBtn);

  await waitFor(() => container);

  expect(container.querySelector(".content").textContent).toContain(
    "Description"
  );
  expect(container.querySelectorAll(".content input").length).toBe(2);
  expect(container).toMatchSnapshot();

  // Click on invoices tab

  fireEvent.click(invoicesBtn);

  await waitFor(() => container);

  expect(custBtn.classList.contains("active")).toBeFalsy();
  expect(itemsBtn.classList.contains("active")).toBeFalsy();
  expect(invoicesBtn.classList.contains("active")).toBeTruthy();

  expect(container).toMatchSnapshot();
  expect(container.querySelector(".content").textContent).toContain("Invoices");

  const newInvoiceBtn = container.querySelector(".content #button");
  fireEvent.click(newInvoiceBtn);

  await waitFor(() => container);

  expect(container.querySelector(".content").textContent).toContain("Bill to");
  expect(container.querySelectorAll("input[type='date']").length).toBe(2);
  expect(container).toMatchSnapshot();

  global.fetch.mockClear();
  delete global.fetch;
});
