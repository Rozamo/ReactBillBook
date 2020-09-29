import React from "react";
import CustomerForm from "../../src/components/customers/CustomersForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

describe("Customer form", () => {
  it("should render CustomerForm", async () => {
    const { container } = render(<CustomerForm />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector("#load-img")).toBe(null);

    expect(container.querySelector(".customer-form").textContent).toContain(
      "Name"
    );

    expect(container.querySelector(".customer-form").textContent).toContain(
      "Email"
    );

    const inputs = container.querySelectorAll("input");
    fireEvent.change(inputs[0], { target: { value: "Anm" } });
    expect(inputs[0].value).toBe("Anm");

    fireEvent.change(inputs[1], { target: { value: 8237482734 } });
    expect(inputs[1].value).toBe("8237482734");

    fireEvent.change(inputs[2], { target: { value: "A@gmail.com" } });
    expect(inputs[2].value).toBe("A@gmail.com");

    expect(container).toMatchSnapshot();

    fireEvent.click(container.querySelector("button"));

    expect(container).toMatchSnapshot();
    expect(container.querySelector("#load-img").getAttribute("alt")).toContain(
      "Loading...."
    );

    await waitFor(() => container);

    expect(container.querySelector("#load-img")).toBe(null);
    expect(container).toMatchSnapshot();
  });
});
