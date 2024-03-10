import { inject } from "@vercel/analytics";
inject({ mode: "production" });
const prerender = true;
export {
  prerender
};
