import request from "supertest";
import app from "../config/app";

describe("Signup Routes", () => {
  test("should return an account on sucess", async () => {
    await request(app).post("/api/signup").send({
      name: "Renan",
      email: "renan.correa@codeby.com.br",
      password: "123",
      passwordConfirmation: "123"
    });
    expect(200);
  });
});
