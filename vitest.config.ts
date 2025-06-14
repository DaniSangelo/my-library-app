import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // já que é backend
    include: ["test/**/*.test.ts"],
  },
});
