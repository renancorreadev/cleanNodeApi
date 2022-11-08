/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Controller,
  EmailValidatorIFace,
  HttpResponse,
  HttpRequest,
  AddAccountIFace
} from "./signup-protocols";
import { MissingParamError, InvalidParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidatorIFace;
  private readonly addAccount: AddAccountIFace;

  constructor(
    emailValidator: EmailValidatorIFace,
    addAccount: AddAccountIFace
  ) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
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
      const account = this.addAccount.add({
        name,
        email,
        password
      });

      return {
        statusCode: 200,
        body: account
      };
    } catch (error) {
      return serverError();
    }
  }
}