import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SidebarItem from "../../src/components/sidebar/SidebarItem";

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

describe("sidebar test", () => {
  it("Should render sidebar", () => {
    act(() => {
      render(
        SidebarItem({
          sidebarChoice: "customers",
          value: "Customers",
          classValue: "",
        }),
        container
      );
    });

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"\\"><span style=\\"min-width: 1em; line-height: 77%;\\"><svg width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 15px;\\" class=\\"bi bi-person-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill-rule=\\"evenodd\\" d=\\"M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\\"></path></svg></span>Customers</div>"`
    );

    act(() => {
      render(
        SidebarItem({
          sidebarChoice: "",
          value: "Customers",
          classValue: "",
        }),
        container
      );
    });
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"\\"><span style=\\"min-width: 1em; line-height: 77%;\\"></span>Customers</div>"`
    );

    act(() => {
      render(
        SidebarItem({
          sidebarChoice: "items",
          value: "Items",
          classValue: "item",
        }),
        container
      );
    });
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"item\\"><span style=\\"min-width: 1em; line-height: 77%;\\"><svg width=\\"0.9em\\" height=\\"0.9em\\" viewBox=\\"0 0 16 16\\" style=\\"margin: 0px 25px 0px 17px;\\" class=\\"bi bi-star-fill\\" fill=\\"currentColor\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\\"></path></svg></span>Items</div>"`
    );
  });
});
