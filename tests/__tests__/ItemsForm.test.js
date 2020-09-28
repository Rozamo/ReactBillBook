import React from "react";
import ItemsForm from "../../src/components/items/ItemsForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

describe("Items form", () => {
  it("should render ItemsForm", async () => {
    const { container } = render(<ItemsForm />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector("#load-img")).toBe(null);

    expect(container.querySelector(".content").textContent).toContain("Name");

    expect(container.querySelector(".content").textContent).toContain(
      "Description"
    );

    const inputs = container.querySelectorAll("input");
    fireEvent.change(inputs[0], { target: { value: "React" } });
    expect(inputs[0].value).toBe("React");

    fireEvent.change(inputs[1], { target: { value: 20000 } });
    expect(inputs[1].value).toBe("20000");

    fireEvent.change(container.querySelector("textarea"), {
      target: { value: "desc" },
    });

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
