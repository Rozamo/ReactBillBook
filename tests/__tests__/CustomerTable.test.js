import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CustomersTable from "../../src/components/customers/CustomersTable";
import { BrowserRouter as Router } from "react-router-dom";

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

describe("CustomersTable test", () => {
  it("should render cust table", async () => {
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
        json: () => Promise.resolve(fakeData),
      })
    );

    await act(async () => {
      render(
        <Router>
          <CustomersTable location={{ state: { submitSuccess: true } }} />
        </Router>,
        container
      );
    });
    expect(container.textContent).toContain("Customers");
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><table class=\\"inv-table\\" id=\\"inv-table\\"><thead><tr><th>NAME</th><th>PHONE</th><th>EMAIL</th><th>CREATED ON</th></tr></thead><tbody><tr><td class=\\"newTD firstTD\\">Jmp</td><td class=\\"newTD middleTD\\"></td><td class=\\"newTD middleTD\\">J@rzp.com</td><td class=\\"newTD lastTD\\">NaN Invalid Date NaN</td></tr></tbody></table></div>"`
    );

    const newCustBtn = document.querySelector("button");
    expect(newCustBtn.textContent).toContain("New Customer");

    act(() => {
      newCustBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><table class=\\"inv-table\\" id=\\"inv-table\\"><thead><tr><th>NAME</th><th>PHONE</th><th>EMAIL</th><th>CREATED ON</th></tr></thead><tbody><tr><td class=\\"newTD firstTD\\">Jmp</td><td class=\\"newTD middleTD\\"></td><td class=\\"newTD middleTD\\">J@rzp.com</td><td class=\\"newTD lastTD\\">NaN Invalid Date NaN</td></tr></tbody></table></div>"`
    );

    global.fetch.mockClear();
    delete global.fetch;
  });
});
