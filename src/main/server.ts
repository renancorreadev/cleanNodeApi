/* eslint-disable n/no-path-concat */
/**
 * Layer that is highly coupled
 * It is not necessary to develop unit tests, but it is important to develop tests
 * integration.
 */

import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper";
import env from "./config/env";

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`);
    });
  })
  .catch(console.error);
