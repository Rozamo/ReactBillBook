import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../../src/components/App";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

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

describe("App test", () => {
  it("should render app", () => {
    act(() => {
      render(
        <Router>
          <App />
        </Router>,
        container
      );
    });
    expect(container.textContent).toContain("Customers");
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"outside-box\\"><div class=\\"side-bar\\"><a href=\\"/customers/list\\"><div class=\\"customers\\"><svg width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 15px;\\" class=\\"bi bi-person-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\\"></path></svg>Customers</div></a><a href=\\"/items/list\\"><div class=\\"items\\"><svg width=\\"0.9em\\" height=\\"0.9em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 17px;\\" class=\\"bi bi-star-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\\"></path></svg>Items</div></a><a href=\\"/invoices\\"><div class=\\"invoices\\"><svg width=\\"1em\\" height=\\"0.9em\\" viewBox=\\"0 0 14 16\\" style=\\"margin: 0px 25px 0px 15px;\\" class=\\"bi bi-file-earmark-text-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7 2l.5-2.5 3 3L10 5a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z\\"></path></svg>Invoices</div></a></div><div class=\\"content\\"></div></div>"`
    );

    const custBtn = document.getElementsByClassName("customers");

    act(() => {
      custBtn[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(custBtn[0].classList.contains("active")).toBeTruthy();

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"outside-box\\"><div class=\\"side-bar\\"><a href=\\"/customers/list\\"><div class=\\"customers active\\"><svg width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 15px;\\" class=\\"bi bi-person-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\\"></path></svg>Customers</div></a><a href=\\"/items/list\\"><div class=\\"items\\"><svg width=\\"0.9em\\" height=\\"0.9em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 17px;\\" class=\\"bi bi-star-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\\"></path></svg>Items</div></a><a href=\\"/invoices\\"><div class=\\"invoices\\"><svg width=\\"1em\\" height=\\"0.9em\\" viewBox=\\"0 0 14 16\\" style=\\"margin: 0px 25px 0px 15px;\\" class=\\"bi bi-file-earmark-text-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7 2l.5-2.5 3 3L10 5a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z\\"></path></svg>Invoices</div></a></div><div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Customers</h1><a href=\\"/customers/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">New Customer</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div></div>"`
    );

    const itemsBtn = document.getElementsByClassName("items");

    act(() => {
      itemsBtn[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(itemsBtn[0].classList.contains("active")).toBeTruthy();
    expect(custBtn[0].classList.contains("active")).toBeFalsy();

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"outside-box\\"><div class=\\"side-bar\\"><a href=\\"/customers/list\\"><div class=\\"customers\\"><svg width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 15px;\\" class=\\"bi bi-person-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\\"></path></svg>Customers</div></a><a href=\\"/items/list\\"><div class=\\"items active\\"><svg width=\\"0.9em\\" height=\\"0.9em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 17px;\\" class=\\"bi bi-star-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\\"></path></svg>Items</div></a><a href=\\"/invoices\\"><div class=\\"invoices\\"><svg width=\\"1em\\" height=\\"0.9em\\" viewBox=\\"0 0 14 16\\" style=\\"margin: 0px 25px 0px 15px;\\" class=\\"bi bi-file-earmark-text-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7 2l.5-2.5 3 3L10 5a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z\\"></path></svg>Invoices</div></a></div><div class=\\"content\\"><div class=\\"top-panel\\"><h1 id=\\"title\\">Items</h1><a href=\\"/items/create\\"><button type=\\"button\\" id=\\"button\\" value=\\"\\"><img src=\\"test-file-stub\\" id=\\"floppy\\" alt=\\"New\\">Add Item</button></a></div><img src=\\"test-file-stub\\" alt=\\"Loading....\\" id=\\"load-img\\"></div></div>"`
    );
  });
});
