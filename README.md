# Automation Exercise Website Testing Portfolio 🧩

This repository contains a comprehensive testing suite for the [Automation Exercise](https://automationexercise.com/) website using Cypress for end-to-end testing, Postman/Newman for API testing, and GitHub Actions for continuous integration.


## Overview

This project demonstrates a full testing approach for web applications, covering both UI and API testing. The tests are automated using industry-standard tools and can be run locally or through a CI/CD pipeline.

## Technologies Used

- [Cypress](https://www.cypress.io/) - For end-to-end testing
- [Newman](https://github.com/postmanlabs/newman) - For running Postman API test collections
- [GitHub Actions](https://github.com/features/actions) - For continuous integration
- [Node.js](https://nodejs.org/) - Runtime environment

## Project Structure

```
├── .github/
│   └── workflows/            # GitHub Actions workflow configurations
├── cypress/
│   ├── e2e/                  # End-to-end test files
│   ├── fixtures/             # Test data
│   ├── plugins/              # Cypress plugins
│   ├── support/              # Support files and custom commands
│   └── videos/               # Test execution videos (gitignored)
├── postman/
│   └── collections/          # Postman API test collections
├── reports/                  # Test reports
├── .gitignore
├── cypress.config.js         # Cypress configuration
├── package.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- Web browser (Chrome recommended for Cypress)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EgleGriciute/automationexercise_website_full_testing_portfolio.git
   cd automationexercise_website_full_testing_portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Running Cypress Tests

To open Cypress Test Runner:

```bash
npx cypress open

```

To run all Cypress tests in headless mode:

```bash
npx cypress run

```

By default, Cypress uses the Electron browser when running in headless mode, but you can specify other browsers, such as Chrome or Firefox, if installed. To do this, you can use the --browser flag, for example:

```bash
npx cypress run --browser chrome

```

To run specific test files:

```bash
npx cypress run --spec "cypress/e2e/your-test-file.cy.js"

```

### Running API Tests with Newman

To run API collection:

```bash
npx newman run cypress/integration/postman_tests/AutomationExercise.postman_collection.json

```

### GitHub Actions Workflow

The project uses GitHub Actions for continuous integration. The workflow automatically runs whenever changes are pushed to the main branch or when a pull request is created.

You can view the workflow configuration in `.github/workflows/main.yml`.

The CI pipeline performs the following steps:
1. Sets up Node.js environment
2. Installs dependencies
3. Runs Cypress tests
4. Runs API tests with Newman
5. Generates and publishes test reports

To manually trigger the workflow:
1. Go to the "Actions" tab in your GitHub repository
2. Select the workflow from the left sidebar
3. Click "Run workflow"

## Test Reports

After running tests, reports are generated in the `reports` directory. 

For Cypress tests, you can find:
- HTML reports at `reports/cypress-report.html`
- Videos of test executions in `cypress/videos/`
- Screenshots of failed tests in `cypress/screenshots/` (only generated for failures)