import request from "supertest";
import app from "../config/app";

describe("CORS  Middleware", () => {
  test("should enable CORS", async () => {
    app.post("/test_cors", (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .get("/test_cors")
      .expect("acess-control-allow-origin", "*")
      .expect("acess-control-allow-methods", "*")
      .expect("acess-control-allow-headers", "*");
  });
});
