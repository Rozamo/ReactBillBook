import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Panel2 from "../../src/components/invoices/invoiceForm/Panel2";

test("Should render Panel2", async () => {
  const changeNotes = jest.fn();

  const { container } = render(
    <Panel2
      value={10}
      itemList={[{ item: { name: "React", amount: 123 }, quantity: 2 }]}
      changeNotes={changeNotes}
    />
  );

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class=\\"panel-2\\"><div class=\\"notes\\"><div class=\\"inv-description\\"><textarea id=\\"description\\" cols=\\"30\\" rows=\\"10\\" placeholder=\\"Write the description here\\"></textarea></div></div><div class=\\"item-total\\" id=\\"inv-items-list\\"><table class=\\"item-total-tbl\\"><tbody><tr><td class=\\"item-total-tbl-name\\">React</td><td class=\\"item-total-tbl-quantity\\">x2</td><td class=\\"item-total-tbl-amount\\">2.46</td></tr></tbody></table><hr><div class=\\"item-total-last-row\\"><span>TOTAL AMOUNT:</span><span id=\\"item-total-amount\\">10</span></div></div></div>"`
  );

  expect(container.textContent).toContain("React");
  expect(container.textContent).toContain("x2");
  expect(container.textContent).toContain("10");
  expect(container.textContent).toContain("2.46");
});
