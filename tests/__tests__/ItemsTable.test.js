import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ItemsTable from "../../src/components/items/ItemsTable";
import { BrowserRouter as Router } from "react-router-dom";

jest.useFakeTimers();

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

describe("ItemsTable test", () => {
  it("should render items table", async () => {
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
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          new Promise((resolve) => setTimeout(() => resolve(fakeData), 1000)),
      })
    );

    await act(async () => {
      render(
        <Router>
          <ItemsTable location={{ state: { submitSuccess: true } }} />
        </Router>,
        container
      );
    });
    expect(container.textContent).toContain("Items");
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Items</h1><a href=\\"/items/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">Add Item</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
    );
    jest.runOnlyPendingTimers();

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Items</h1><a href=\\"/items/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">Add Item</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
    );

    const newCustBtn = document.querySelector("button");
    expect(newCustBtn.textContent).toContain("Add Item");

    act(() => {
      newCustBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Items</h1><a href=\\"/items/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">Add Item</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div>"`
    );

    global.fetch.mockClear();
    delete global.fetch;
  });
});
