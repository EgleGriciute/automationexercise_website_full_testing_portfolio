const { defineConfig } = require('cypress');
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from `.env` file in `cypress/fixtures/`
const loadEnvVariables = () => {
  const envPath = path.resolve(__dirname, 'cypress/fixtures/.env');
  dotenv.config({ path: envPath });
};

// Block external hosts to improve test performance
const blockedHosts = [
  'www.google-analytics.com',
  '*.googleadservices.com',
  '*.doubleclick.net',
  '*.googletagmanager.com',
];

// Register custom Cypress tasks
const registerCustomTasks = (on) => {
  on('task', { downloadFile });
};

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    blockHosts: blockedHosts,
    setupNodeEvents(on, config) {
      loadEnvVariables();
      registerCustomTasks(on);

      // Merge environment variables into Cypress config
      config.env = {
        ...config.env, // Keep existing Cypress env variables
        ...process.env, // Load variables from `.env`
      };

      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',  // Added spec pattern
    supportFile: 'cypress/support/e2e.js',  // Added support file
    defaultCommandTimeout: 10000,  // Added default command timeout
    requestTimeout: 10000,  // Added request timeout
    responseTimeout: 10000,  // Added response timeout
    viewportWidth: 1280,  // Added viewport width
    viewportHeight: 720,  // Added viewport height
  },
});
