import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Invoices from "../../src/components/invoices/Invoices";

const fakeData = {
  entity: "collection",
  items: [
    {
      id: "inv_FbMK68ez9VJ5cj",
      entity: "invoice",
      receipt: "Receipt No. 1599747900.187}",
      invoice_number: "Receipt No. 1599747900.187}",
      customer_id: "cust_FYUmCriA04Acfc",
      customer_details: {
        id: "cust_FYUmCriA04Acfc",
        name: "Jmp",
        email: "J@gmail.com",
        contact: "9123456780",
        gstin: "12ABCDE2356F7GH",
        billing_address: null,
        shipping_address: null,
        customer_name: "Jmp",
        customer_email: "J@gmail.com",
        customer_contact: "9123456780",
      },
      order_id: null,
      line_items: [
        {
          id: "li_FbMK699irKYEh8",
          item_id: "item_FYUoMOgqrTom8c",
          ref_id: null,
          ref_type: null,
          name: "React",
          description: "React.js",
          amount: 50000,
          unit_amount: 50000,
          gross_amount: 50000,
          tax_amount: 0,
          taxable_amount: 50000,
          net_amount: 50000,
          currency: "INR",
          type: "invoice",
          quantity: 1,
        },
      ],
      status: "draft",
      expire_by: 1600128000,
      issued_at: null,
      paid_at: null,
      cancelled_at: null,
      expired_at: null,
      sms_status: "pending",
      email_status: "pending",
      date: 1599782400,
      terms: "",
      partial_payment: true,
      gross_amount: 50000,
      tax_amount: 0,
      taxable_amount: 50000,
      amount: 50000,
      amount_paid: null,
      amount_due: null,
      currency: "INR",
      currency_symbol: "₹",
      description: "",
      type: "invoice",
      group_taxes_discounts: false,
      created_at: 1599747899,
    },
  ],
};

test("renders Invoices list", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => new Promise((resolve) => resolve(fakeData)),
    })
  );

  const { container } = render(
    <Router>
      <Invoices />
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

test("handles error Invoices list", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        new Promise((resolve) =>
          resolve({ status: 500, error: true, message: "Something went wrong" })
        ),
    })
  );

  const { container } = render(
    <Router>
      <Invoices />
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
