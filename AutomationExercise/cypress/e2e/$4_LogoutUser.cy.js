/// <reference types="cypress" />

describe("$4_LogoutUser", () => {

    before(() => {
        cy.hideGoogleAds();
    })

    beforeEach(() => {
        // Navigate to the login page before each test:
        cy.visit('/');
    });

    it("should logout successfully", () => {

        // 1. Launch browser:
        // 2. Navigate to url 'http://automationexercise.com':
        // 3. Verify that home page is visible successfully:

        cy.verifyHomePageIsVisible();

        cy.registerUser().then(() => {

            const { email, password, name } = Cypress.env('user');

            // Logout after registration:
            cy.get("a[href='/logout']").click();

            // 4. Click on 'Signup / Login' button:
            cy.get("[href='/login']").click();

            // 5. Verify 'Login to your account' is visible:
            cy.get(".login-form h2").should("be.visible");

            // 6. Enter correct email address and password:
            cy.get("[data-qa='login-email']").type(email);
            cy.get("[data-qa='login-password']").type(password);

            // 7. Click 'login' button:
            cy.get("[data-qa='login-button']").click();

            // 8. Verify that 'Logged in as username' is visible:
            cy.get("ul > li:nth-child(10)").should("contain.text", name);

            // 9. Click 'Logout' button:
            cy.get("a[href='/logout']").click();

            // 10. Verify that user is navigated to login page:
            cy.location('pathname').should("eq", "/login");
        });
    });
});