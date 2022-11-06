import { HttpResponse, HttpRequest } from "../protocols/http";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";
export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }
    return {
      statusCode: 400
    };
  }
}
