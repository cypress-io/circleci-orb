import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'mx9dpd',
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      webpackConfig: { stats: "errors-only" }, // see issue https://github.com/cypress-io/cypress/issues/26456
    },
    specPattern: "**/*.cy.ts",
  },
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
