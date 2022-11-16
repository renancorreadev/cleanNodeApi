/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Controller,
  EmailValidatorIFace,
  HttpResponse,
  HttpRequest,
  AddAccountIFace
} from "./signup-protocols";
import { MissingParamError, InvalidParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";

/* It receives data from the HTTP request, validates it, and then sends it to the
addAccount method */
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidatorIFace;
  private readonly addAccount: AddAccountIFace;

  /**
   * The constructor function is called when the class is instantiated. It's used to
   * initialize the class
   * @param {EmailValidatorIFace} emailValidator - EmailValidatorIFace
   * @param {AddAccountIFace} addAccount - AddAccountIFace
   */
  constructor(
    emailValidator: EmailValidatorIFace,
    addAccount: AddAccountIFace
  ) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  /**
   * It receives an httpRequest, validates the data, calls the addAccount method and
   * returns an httpResponse
   * @param {HttpRequest} httpRequest - HttpRequest - The request object that
   * contains the data sent by the client.
   * @returns a HttpResponse object.
   */
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation"
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      /** Add data received to method add account */
      const account = await this.addAccount.add({
        name,
        email,
        password
      });

      return ok(account);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
