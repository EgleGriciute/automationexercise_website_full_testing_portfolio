const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Your setup here
    },
    baseUrl: 'https://automationexercise.com', // Set the base URL
    blockHosts: [
      'www.google-analytics.com', // Block analytics
      '*.googleadservices.com', // Block ad services
      '*.doubleclick.net', // Block DoubleClick ads
      '*.googletagmanager.com', // Block Google Tag Manager
    ],
  },
};
