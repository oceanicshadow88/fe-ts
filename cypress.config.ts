import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 4000
  },

  projectId: 'zjgbkp',
  viewportWidth: 1920,
  viewportHeight: 1080,

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}'
  }
});
