import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

/* Mocking the validator module. */
jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  }
}));

/**
 * It creates a new instance of the EmailValidatorAdapter class
 * @returns A new instance of EmailValidatorAdapter
 */
const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

/* A test suite for EmailValidator. */
describe("EmailValidator Adapter", () => {
  /* Mocking the validator module. */
  test("Should return false if validator returns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  /* Mocking the validator module. */
  test("Should return true if validator returns true", () => {
    const sut = makeSut();
    const isValid = sut.isValid("valid_mail@mail.com");
    expect(isValid).toBe(true);
  });

  /* Mocking the validator module. */
  test("Should call validator with correct Email", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@gmail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@gmail.com");
  });
});
