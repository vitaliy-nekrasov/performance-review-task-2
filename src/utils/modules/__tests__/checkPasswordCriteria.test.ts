import { checkPasswordCriteria } from "../checkPasswordCriteria";

describe("checkPasswordCriteria", () => {
  test("returns 0 for an empty password", () => {
    expect(checkPasswordCriteria("")).toBe(0);
  });

  test("returns 2 for a password that only meets length criteria", () => {
    expect(checkPasswordCriteria("abcdefgh")).toBe(2);
  });

  test("returns 3 for a password that meets length and uppercase letter criteria", () => {
    expect(checkPasswordCriteria("Abcdefgh")).toBe(3);
  });

  test("returns 3 for a password that meets length, uppercase and lowercase letter criteria", () => {
    expect(checkPasswordCriteria("Abcdefghi")).toBe(3);
  });

  test("returns 4 for a password that meets length, uppercase, lowercase, and digit criteria", () => {
    expect(checkPasswordCriteria("Abcdefghi1")).toBe(4);
  });

  test("returns 5 for a password that meets all criteria", () => {
    expect(checkPasswordCriteria("Abcdefghi1!")).toBe(5);
  });

  test("returns 4 for a short password that does not meet length criteria", () => {
    expect(checkPasswordCriteria("Ab1!")).toBe(4);
  });

  test("returns correct criteria count for special characters only", () => {
    expect(checkPasswordCriteria("!")).toBe(1);
  });

  test("returns 2 for a password that only meets the digit criteria", () => {
    expect(checkPasswordCriteria("12345678")).toBe(2);
  });

  test("returns 3 for a password with uppercase, lowercase, and length but no digit or special character", () => {
    expect(checkPasswordCriteria("AbcdefghJ")).toBe(3);
  });
});
