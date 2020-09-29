import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Panel1 from "../../src/components/invoices/invoiceForm/Panel1";

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

test("Should render Panel1", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => new Promise((resolve) => resolve(fakeData)),
    })
  );
  const changeCustomerDetails = jest.fn();
  const changeDate = jest.fn();
  const changeExpirebyDate = jest.fn();

  const { container } = render(
    <Panel1
      changeCustomerDetails={changeCustomerDetails}
      changeDate={changeDate}
      changeExpirebyDate={changeExpirebyDate}
    />
  );

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class=\\"panel-1\\"><div class=\\"inv-cust-panel\\"><div style=\\"color: rgb(125, 123, 123);\\">Bill to</div><div class=\\"inv-cust-det\\"><div>No Customer Chosen</div><button id=\\"inv-cust-change\\">Choose</button></div></div><div><label>Issued at</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"issued-at\\" name=\\"issued-at\\"></div><div><label>Due-Date</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"due-date\\" name=\\"due-date\\"></div></div>"`
  );

  expect(container.querySelectorAll("input[type='Date']").length).toBe(2);
  expect(container.innerHTML).toContain("Bill to");
  expect(container.innerHTML).toContain("Issued at");
  expect(container.innerHTML).toContain("Due-Date");

  expect(fetch).toHaveBeenCalledTimes(1);

  global.fetch.mockClear();
  delete global.fetch;
});
