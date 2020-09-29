import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CustomerSelect from "../../src/components/invoices/invoiceForm/CustomerSelect";

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

test("Should render CustomerSelect", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => new Promise((resolve) => resolve(fakeData)),
    })
  );
  const changeCustomerDetails = jest.fn();

  const { container } = render(
    <CustomerSelect changeCustomerDetails={changeCustomerDetails} />
  );

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class=\\"inv-cust-det\\"><div>No Customer Chosen</div><button id=\\"inv-cust-change\\">Choose</button></div>"`
  );
  expect(container.innerHTML).toContain("No Customer Chosen");

  fireEvent.click(container.querySelector("button"));

  expect(container.innerHTML).toMatchInlineSnapshot(`"Loading..."`);

  await waitFor(() => container);

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class=\\"inv-cust-det\\"><select class=\\"customer_ddl\\" id=\\"cust_list\\"><option value=\\"Choose Customer\\" selected=\\"\\">Choose Customer</option><option value=\\"0\\">Jmp</option></select></div>"`
  );
  expect(container.innerHTML).toContain("Jmp");

  expect(fetch).toHaveBeenCalledTimes(1);

  global.fetch.mockClear();
  delete global.fetch;
});
