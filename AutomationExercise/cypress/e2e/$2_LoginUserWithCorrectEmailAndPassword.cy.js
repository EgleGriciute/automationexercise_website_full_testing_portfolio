/// <reference types="cypress" />

describe("$2_LoginUserWithCorrectEmailAndPassword", () => {

    before(() => {

        // Register a user before running the test:
        cy.registerUser();

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:
    });

    beforeEach(() => {

        const { email, password } = Cypress.env('user');

        // Use cy.session() to persist the login session:
        cy.session([email, password], () => {

            // 4. Click on 'Signup / Login' button:
            cy.visit('/login');

            // 5. Verify 'Login to your account' is visible:
            cy.get(".login-form h2").should("be.visible");

            // 6. Enter correct email address and password:
            cy.get("[data-qa='login-email']").type(email);
            cy.get("[data-qa='login-password']").type(password);

            // 7. Click 'login' button:
            cy.get("[data-qa='login-button']").click();

        });
    });

    it("should log in with correct credentials and verify user is logged in", () => {
        const { name } = Cypress.env('user');

        // Navigate to home page (assuming user is already logged in via session):
        cy.visit('/');

        // 8. Verify that 'Logged in as username' is visible:
        cy.get("ul > li:nth-child(10)").should("contain.text", name);
    });

    after(() => {

        // 9. Click 'Delete Account' button:
        // 10. Verify that 'ACCOUNT DELETED!' is visible:

        cy.deleteAccount();
    });
});
