import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../presentation/protocols";
import { LogControllerDecorator } from "./log";

/**
 * It returns a new instance of a class that implements the Controller interface
 * @returns A function that returns an object that implements the Controller
 * interface.
 */
const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: "Renan"
        }
      };
      return await new Promise((resolve) => resolve(httpResponse));
    }
  }

  return new ControllerStub();
};

interface sutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
}

/**
 * It creates a LogControllerDecorator instance and returns it along with its
 * dependencies
 * @returns An object with two properties: sut and controllerStub.
 */
const makeSut = (): sutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);

  return {
    sut,
    controllerStub
  };
};

/* It's a test that checks if the handle method of the controller is being called with correct values. */
describe("LogController Decorator", () => {
  test("Should call controller handle", async () => {
    const { sut, controllerStub } = makeSut();

    const handleSpy = jest.spyOn(controllerStub, "handle");
    const httpRequest = {
      body: {
        email: "any_email@gmail.com",
        name: "any_name",
        password: "any_password",
        passWordConfirmation: "any_password"
      }
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
