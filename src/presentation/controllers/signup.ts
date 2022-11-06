import { HttpResponse, HttpRequest } from "../protocols/http";
import { MissingParamError } from "../errors/missing-param-error";
export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError("name")
      };
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError("email")
      };
    }
    return {
      statusCode: 400
    };
  }
}
