/**
 * Layer that is highly coupled
 * It is not necessary to develop unit tests, but it is important to develop tests
 * integration.
 */
import app from "./config/app";

app.listen(5050, () => {
  console.log("Server running at http://localhost:5050");
});
