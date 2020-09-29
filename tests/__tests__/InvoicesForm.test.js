import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import InvoiceForm from "../../src/components/invoices/invoiceForm/InvoiceForm";
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

describe("InvoiceForm", () => {
  it("should render invoice form", async () => {
    const fakeData = {
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
    // jest.spyOn(global, "fetch").mockImplementation(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve(fakeUser),
    //   })
    // );

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData),
      })
    );
    await act(async () => {
      render(
        <Router>
          <InvoiceForm />
        </Router>,
        container
      );
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1>New Invoice</h1><button id=\\"button\\" value=\\"create-invoice\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Invoice</button></div><div class=\\"panel-1\\"><div class=\\"inv-cust-panel\\"><div style=\\"color: rgb(125, 123, 123);\\">Bill to</div><div class=\\"inv-cust-det\\"><div>No Customer Chosen</div><button id=\\"inv-cust-change\\">Choose</button></div></div><div><label>Issued at</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"issued-at\\" name=\\"issued-at\\"></div><div><label>Due-Date</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"due-date\\" name=\\"due-date\\"></div></div><div class=\\"inv-item-panel\\"><table class=\\"item-tbl\\" id=\\"inv-item-tbl\\"><tbody><tr></tr></tbody></table><div class=\\"item-btn\\"><button id=\\"add-item\\"><svg width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 16 16\\" class=\\"bi bi-basket2-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1z\\"></path></svg>Add Item</button></div></div><hr><div class=\\"panel-2\\"><div class=\\"notes\\"><div class=\\"inv-description\\"><textarea id=\\"description\\" cols=\\"30\\" rows=\\"10\\" placeholder=\\"Write the description here\\"></textarea></div></div><div class=\\"item-total\\" id=\\"inv-items-list\\"><table class=\\"item-total-tbl\\"><tbody></tbody></table><span></span><div class=\\"item-total-last-row\\"><span>TOTAL AMOUNT:</span><span id=\\"item-total-amount\\">0</span></div></div></div></div>"`
    );

    // trying to change customer

    const changeCustBtn = document.getElementById("inv-cust-change");

    act(() => {
      changeCustBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1>New Invoice</h1><button id=\\"button\\" value=\\"create-invoice\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Invoice</button></div><div class=\\"panel-1\\"><div class=\\"inv-cust-panel\\"><div style=\\"color: rgb(125, 123, 123);\\">Bill to</div><div class=\\"inv-cust-det\\"><select class=\\"customer_ddl\\" id=\\"cust_list\\"><option value=\\"Choose Customer\\" selected=\\"\\">Choose Customer</option><option value=\\"0\\">Jmp</option></select></div></div><div><label>Issued at</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"issued-at\\" name=\\"issued-at\\"></div><div><label>Due-Date</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"due-date\\" name=\\"due-date\\"></div></div><div class=\\"inv-item-panel\\"><table class=\\"item-tbl\\" id=\\"inv-item-tbl\\"><tbody><tr></tr></tbody></table><div class=\\"item-btn\\"><button id=\\"add-item\\"><svg width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 16 16\\" class=\\"bi bi-basket2-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1z\\"></path></svg>Add Item</button></div></div><hr><div class=\\"panel-2\\"><div class=\\"notes\\"><div class=\\"inv-description\\"><textarea id=\\"description\\" cols=\\"30\\" rows=\\"10\\" placeholder=\\"Write the description here\\"></textarea></div></div><div class=\\"item-total\\" id=\\"inv-items-list\\"><table class=\\"item-total-tbl\\"><tbody></tbody></table><span></span><div class=\\"item-total-last-row\\"><span>TOTAL AMOUNT:</span><span id=\\"item-total-amount\\">0</span></div></div></div></div>"`
    );

    // select customer from dropdown menu

    const select = document.querySelector("select");
    const options = document.querySelectorAll("option");

    select.selectedIndex = 1;

    expect(options.length).toBe(2);
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1>New Invoice</h1><button id=\\"button\\" value=\\"create-invoice\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Invoice</button></div><div class=\\"panel-1\\"><div class=\\"inv-cust-panel\\"><div style=\\"color: rgb(125, 123, 123);\\">Bill to</div><div class=\\"inv-cust-det\\"><select class=\\"customer_ddl\\" id=\\"cust_list\\"><option value=\\"Choose Customer\\" selected=\\"\\">Choose Customer</option><option value=\\"0\\">Jmp</option></select></div></div><div><label>Issued at</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"issued-at\\" name=\\"issued-at\\"></div><div><label>Due-Date</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"due-date\\" name=\\"due-date\\"></div></div><div class=\\"inv-item-panel\\"><table class=\\"item-tbl\\" id=\\"inv-item-tbl\\"><tbody><tr></tr></tbody></table><div class=\\"item-btn\\"><button id=\\"add-item\\"><svg width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 16 16\\" class=\\"bi bi-basket2-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1z\\"></path></svg>Add Item</button></div></div><hr><div class=\\"panel-2\\"><div class=\\"notes\\"><div class=\\"inv-description\\"><textarea id=\\"description\\" cols=\\"30\\" rows=\\"10\\" placeholder=\\"Write the description here\\"></textarea></div></div><div class=\\"item-total\\" id=\\"inv-items-list\\"><table class=\\"item-total-tbl\\"><tbody></tbody></table><span></span><div class=\\"item-total-last-row\\"><span>TOTAL AMOUNT:</span><span id=\\"item-total-amount\\">0</span></div></div></div></div>"`
    );

    // act(() => {
    //   select.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // });

    // act(() => {
    //   options[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    // });

    // trying to add new item

    const addItemBtn = document.getElementById("add-item");

    act(() => {
      addItemBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect();
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"content\\"><div class=\\"top-panel\\"><h1>New Invoice</h1><button id=\\"button\\" value=\\"create-invoice\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"Save\\">Save Invoice</button></div><div class=\\"panel-1\\"><div class=\\"inv-cust-panel\\"><div style=\\"color: rgb(125, 123, 123);\\">Bill to</div><div class=\\"inv-cust-det\\"><select class=\\"customer_ddl\\" id=\\"cust_list\\"><option value=\\"Choose Customer\\" selected=\\"\\">Choose Customer</option><option value=\\"0\\">Jmp</option></select></div></div><div><label>Issued at</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"issued-at\\" name=\\"issued-at\\"></div><div><label>Due-Date</label><input style=\\"width: 170px;\\" type=\\"date\\" id=\\"due-date\\" name=\\"due-date\\"></div></div><div class=\\"inv-item-panel\\"><table class=\\"item-tbl\\" id=\\"inv-item-tbl\\"><tbody><tr></tr></tbody></table><div class=\\"item-btn\\"><select class=\\"item_ddl\\"><option value=\\"Select Items\\" selected=\\"\\">Select Items</option><option value=\\"0\\">Jmp</option></select></div></div><hr><div class=\\"panel-2\\"><div class=\\"notes\\"><div class=\\"inv-description\\"><textarea id=\\"description\\" cols=\\"30\\" rows=\\"10\\" placeholder=\\"Write the description here\\"></textarea></div></div><div class=\\"item-total\\" id=\\"inv-items-list\\"><table class=\\"item-total-tbl\\"><tbody></tbody></table><span></span><div class=\\"item-total-last-row\\"><span>TOTAL AMOUNT:</span><span id=\\"item-total-amount\\">0</span></div></div></div></div>"`
    );

    // global.fetch.mockRestore();
    global.fetch.mockClear();
    delete global.fetch;
  });
});
