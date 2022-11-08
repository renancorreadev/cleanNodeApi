import { SignUpController } from "./signup";
import {
  MissingParamError,
  InvalidParamError,
  ServerError
} from "../../errors";
import {
  EmailValidatorIFace,
  AccountModelIFace,
  AddAccountModelIFace,
  AddAccountIFace
} from "./signup-protocols";

const makeEmailValidator = (): EmailValidatorIFace => {
  class EmailValidatorStub implements EmailValidatorIFace {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccountIFace => {
  class AddAccountStub implements AddAccountIFace {
    add(account: AddAccountModelIFace): AccountModelIFace {
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "valid_password"
      };

      return fakeAccount;
    }
  }

  return new AddAccountStub();
};

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidatorIFace;
  addAccountStub: AddAccountIFace;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();

  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  };
};

describe("SignupController", () => {
  test("Should return 400 if no name is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any_email",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no password confirmation is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email",
        password: "any_password"
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if password confirmation fails", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email",
        password: "any_password",
        passwordConfirmation: "invalid_password"
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = makeSut();

    /**
      @Change the value of the isValid method to false
    */
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email@gmail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should return 500 if EmailValidator Throws", () => {
    const { sut, emailValidatorStub } = makeSut();
    /* Implements a mock implementation of emailValidatorStub */
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@gmail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call EmailValidator with correct Email", () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@gmail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@gmail.com");
  });

  test("Should call addAccount with correct values", () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, "add");

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@gmail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@gmail.com",
      password: "any_password"
    });
  });
});
