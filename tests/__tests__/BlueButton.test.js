import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import BlueButton from "../../src/components/bluebutton/BlueButton";

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

describe("BlueButton test", () => {
  it("Should render button", () => {
    act(() => {
      render(
        <BlueButton sidebarChoice="customers" contentChoice="list" />,
        container
      );
    });
    expect(document.getElementById("button").textContent).toContain(
      "New Customer"
    );
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button>"`
    );

    act(() => {
      render(
        <BlueButton sidebarChoice="items" contentChoice="list" />,
        container
      );
    });
    expect(document.getElementById("button").textContent).toContain("Add Item");

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">Add Item</button>"`
    );

    act(() => {
      render(
        <BlueButton sidebarChoice="invoices" contentChoice="create" />,
        container
      );
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Invoice</button>"`
    );
    expect(document.getElementById("button").textContent).toBe("Save Invoice");
  });
});
