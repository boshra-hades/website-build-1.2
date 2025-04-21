import { defineStackbitConfig } from "@stackbit/types";

export default defineStackbitConfig({
  stackbitVersion: '^0.5.0',

  modelExtensions: [
    { name: "Page", type: "page", urlPath: "/{slug}" },
    { name: "Product", type: "page", urlPath: "/product/{slug}" }
  ]
});
