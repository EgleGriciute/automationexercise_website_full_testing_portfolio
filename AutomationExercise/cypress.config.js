const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the `.env` file inside `cypress/fixtures/`
dotenv.config({ path: path.resolve(__dirname, 'cypress/fixtures/.env') });

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Merge process.env variables into Cypress config
      config.env = {
        ...config.env,  // Keep existing Cypress env variables
        ...process.env  // Load variables from `.env`
      };
      return config;
    },
    baseUrl: 'https://automationexercise.com',
    blockHosts: [
      'www.google-analytics.com',
      '*.googleadservices.com',
      '*.doubleclick.net',
      '*.googletagmanager.com',
    ],
  },
};
