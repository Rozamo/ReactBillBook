import React from "react";
import ItemPanel from "../../src/components/invoices/invoiceForm/ItemPanel";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

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

test("Should render ItemPanel", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => new Promise((resolve) => resolve(fakeData)),
    })
  );
  const fakeChangeAmount = jest.fn();

  const { container } = render(<ItemPanel changeAmount={fakeChangeAmount} />);

  expect(container.querySelector("select") === null).toBeTruthy();
  expect(container).toMatchSnapshot();

  const addBtn = container.querySelector("button");

  fireEvent.click(addBtn);

  await waitFor(() => container);

  expect(container.querySelector("select") === null).toBeFalsy();
  expect(container.innerHTML).toContain("Jmp");
  expect(container).toMatchSnapshot();

  global.fetch.mockClear();
  delete global.fetch;
});
