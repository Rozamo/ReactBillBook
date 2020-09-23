import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CustomerForm from "../../src/components/customers/CustomersForm";

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

describe("Customer form", () => {
  it("should render form", () => {
    act(() => {
      render(<CustomerForm />, container);
    });
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">New Customer</h1></div><form class=\\"customer-form\\"><div class=\\"cust-panel-1\\"><div><label for=\\"name\\">Name</label><input type=\\"text\\" name=\\"name\\" required=\\"\\" value=\\"\\"></div><div><label for=\\"contact\\">Phone</label><input type=\\"text\\" name=\\"contact\\" value=\\"\\"></div></div><label for=\\"email\\">Email</label><div class=\\"cust-panel-1\\"><input type=\\"email\\" name=\\"email\\" value=\\"\\"><button type=\\"submit\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Customer</button></div></form></div>"`
    );
    const addCustBtn = document.querySelector("button");
    expect(addCustBtn.textContent).toContain("Save Customer");
    act(() => {
      addCustBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">New Customer</h1></div><form class=\\"customer-form\\"><div class=\\"cust-panel-1\\"><div><label for=\\"name\\">Name</label><input type=\\"text\\" name=\\"name\\" required=\\"\\" value=\\"\\"></div><div><label for=\\"contact\\">Phone</label><input type=\\"text\\" name=\\"contact\\" value=\\"\\"></div></div><label for=\\"email\\">Email</label><div class=\\"cust-panel-1\\"><input type=\\"email\\" name=\\"email\\" value=\\"\\"><button type=\\"submit\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Customer</button></div></form></div>"`
    );

    const name = document.querySelectorAll("input")[0];
    const contact = document.querySelectorAll("input");

    name.value = "Anm";
    contact.value = 23;

    expect(name.value.length).toBe(3);
    expect(contact.value).toBe(23);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">New Customer</h1></div><form class=\\"customer-form\\"><div class=\\"cust-panel-1\\"><div><label for=\\"name\\">Name</label><input type=\\"text\\" name=\\"name\\" required=\\"\\" value=\\"\\"></div><div><label for=\\"contact\\">Phone</label><input type=\\"text\\" name=\\"contact\\" value=\\"\\"></div></div><label for=\\"email\\">Email</label><div class=\\"cust-panel-1\\"><input type=\\"email\\" name=\\"email\\" value=\\"\\"><button type=\\"submit\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Customer</button></div></form></div>"`
    );
  });
});
