import { route } from "./router";
import type { Env } from "./types";

export default {
  async fetch(req: Request, env: Env) {
    return route(req, env);
  },
};
