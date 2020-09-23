import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ItemsForm from "../../src/components/items/ItemsForm";

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
      render(<ItemsForm />, container);
    });
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">New Item</h1></div><form class=\\"customer-form\\" style=\\"width: 50%;\\"><label for=\\"name\\">Name</label><input type=\\"text\\" name=\\"name\\" value=\\"\\"><label for=\\"amount\\">Price</label><input type=\\"number\\" name=\\"amount\\" value=\\"\\"><label for=\\"name\\">Description</label><textarea type=\\"text\\" name=\\"description\\"></textarea><br><button type=\\"submit\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Item</button></form></div>"`
    );

    expect(container.textContent).toContain("Name");
    const name = document.querySelectorAll("input")[0];
    const desc = document.getElementsByName("description")[0];

    name.value = "Mouse";
    desc.value = "desc";

    expect(name.value.length).toBe(5);
    expect(desc.value).toBe("desc");
  });
});
