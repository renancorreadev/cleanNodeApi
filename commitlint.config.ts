import type { UserConfig } from "@commitlint/types";

const CommitGlobalConfig: UserConfig = {
  extends: ["gitmoji"],
  rules: {
    "header-max-length": [0, "always", 100],
    "scope-case": [0, "always", "pascal-case"]
  }
};

export default CommitGlobalConfig;
