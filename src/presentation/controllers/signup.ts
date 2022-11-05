export class SignUpController {
  handle(httpRequest: any): any {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error("Missing param: name")
      };
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error("Missing param: Email")
      };
    }
  }
}
