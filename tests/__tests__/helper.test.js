import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import INR from "../../src/components/helper/utils/INR";

import TransformDate from "../../src/components/helper/utils/TransformDate";
import Table from "../../src/components/helper/table/Table";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// utils

describe("INR test", () => {
  it("should display amount in INR", () => {
    expect(INR.format(10)).toBe("\u20B910.00");

    expect(INR.format(10.0)).toBe("\u20B910.00");
  });
});

describe("TransformDate test", () => {
  it("should display Date", () => {
    expect(TransformDate(129283923)).toBe("5 Feb 1974");
    const currDate = new Date();
    const str =
      String(currDate.getDate()) +
      " " +
      currDate.toLocaleString("default", { month: "short" }) +
      " " +
      currDate.getFullYear();
    expect(TransformDate(new Date().getTime() / 1000)).toBe(str);
  });
});

// Table
describe("Table test", () => {
  it("should render table", () => {
    const items = [
      { name: "an", email: "an@rzp.com" },
      { name: "an2", email: "an2@rzp.com" },
    ];
    const tableHead = ["NAME", "EMAIL"];
    const fields = ["name", "email"];
    act(() => {
      render(Table(items, tableHead, fields, true), container);
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<table class=\\"inv-table\\" id=\\"inv-table\\"><thead><tr><th>NAME</th><th>EMAIL</th></tr></thead><tbody><tr><td class=\\"newTD firstTD\\">an</td><td class=\\"newTD lastTD\\">an@rzp.com</td></tr><tr><td class=\\"\\">an2</td><td class=\\"\\">an2@rzp.com</td></tr></tbody></table>"`
    );
  });
});
