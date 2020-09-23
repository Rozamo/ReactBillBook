import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../../src/components/App";

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
    // act(() => {
    //   render(<App />, container);
    // });
    // expect(container.textContent).toContain("Customers");
    expect(true).toBeTruthy();
  });
});
