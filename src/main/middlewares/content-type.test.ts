import request from "supertest";
import app from "../config/app";

describe("Content Type  Middleware", () => {
  test("should return default content type as Json", async () => {
    app.get("/test_content_type", (req, res) => {
      res.json("");
    });

    await request(app).get("/test_content_type").expect("content-type", /json/);
  });
});
