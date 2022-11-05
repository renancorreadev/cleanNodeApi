import { SignUpController } from "./signup";
describe("first", () => {
  test("Should return 400 if no name is provided", () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: "",
        password: "",
        passwordConfirmation: ""
      }
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
