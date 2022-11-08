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
    async add(account: AddAccountModelIFace): Promise<AccountModelIFace> {
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "valid_password"
      };

      return await new Promise((resolve) => resolve(fakeAccount));
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
  test("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any_email",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no password confirmation is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email",
        password: "any_password"
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if password confirmation fails", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email",
        password: "any_password",
        passwordConfirmation: "invalid_password"
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation")
    );
  });

  test("Should return 400 if an invalid email is provided", async () => {
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

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should return 500 if EmailValidator Throws", async () => {
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

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if AddAccount Throws", async () => {
    const { sut, addAccountStub } = makeSut();
    /* Implements a mock implementation of emailValidatorStub */
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@gmail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call EmailValidator with correct Email", async () => {
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

    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@gmail.com");
  });

  test("Should call addAccount with correct values", async () => {
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

    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@gmail.com",
      password: "any_password"
    });
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();

    /** @FakeHttpRequest Case All name, email, password is provided */
    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email@gmail.com",
        password: "valid_password",
        passwordConfirmation: "valid_password"
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email@mail.com",
      password: "valid_password"
    });
  });
});
