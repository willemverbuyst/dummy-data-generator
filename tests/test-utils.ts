import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";

export async function clickClearType(
  user: UserEvent,
  element: HTMLElement,
  value: string,
) {
  await user.click(element);
  await user.clear(element);
  await user.type(element, value);
}

export async function findByRoleClickClearType(
  user: UserEvent,
  role: string,
  name: RegExp | string,
  value: string,
) {
  const element = await screen.findByRole(role, {
    name,
  });
  await user.click(element);
  await user.clear(element);
  await user.type(element, value);
}

export async function findByRoleClickClearTypeTabSelect(
  user: UserEvent,
  role: string,
  name: RegExp | string,
  value: string,
  option: string,
) {
  await findByRoleClickClearType(user, role, name, value);
  await user.tab();

  if (!document.activeElement) {
    throw new Error("No active element after tabbing");
  }

  await user.type(document.activeElement, option);
  const optionElement = await screen.findByRole("option", { name: option });
  await user.click(optionElement);
}

export async function findByRoleClickClearTypeTabType(
  user: UserEvent,
  role: string,
  name: RegExp | string,
  value1: string,
  value2: string,
) {
  await findByRoleClickClearType(user, role, name, value1);
  await user.tab();

  if (!document.activeElement) {
    throw new Error("No active element after tabbing");
  }

  await user.type(document.activeElement, value2);
}

export async function findByRoleClickClearTypeTabSelectType(
  user: UserEvent,
  role: string,
  name: RegExp | string,
  value1: string,
  option: string,
  value2: string,
) {
  await findByRoleClickClearType(user, role, name, value1);
  await user.tab();

  if (!document.activeElement) {
    throw new Error("No active element after tabbing");
  }

  await user.type(document.activeElement, option);
  const optionElement = await screen.findByRole("option", { name: option });
  await user.click(optionElement);
  await user.tab();

  if (!document.activeElement) {
    throw new Error("No active element after tabbing");
  }

  await user.type(document.activeElement, value2);
}
